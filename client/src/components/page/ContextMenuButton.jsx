import React from 'react';
import {
	useHistory,
	Link,
} from 'react-router-dom';
import {
	Button,
	Menu,
	Dropdown,
} from 'antd';
import {
	PlusOutlined,
} from '@ant-design/icons';

import './ContextMenuButton.less';

const ContextMenu = ({ menuOptions }) => {
	if (!menuOptions || !menuOptions.length) {
		return null;
	}

	return (
		<Menu id="app-fab-menu">
			{menuOptions.map(({ Icon, title, path, action }, i) => {
				if (path && action) throw Error("Can't have a path and an action for a Context Menu Item");
				return (
					<Menu.Item
						key={path || `context-menu-item-${i}`}
						title={title || ""}
						icon={Icon && <Icon />}
						onClick={action}
					>
						{title}
						{path && <Link to={path} />}
					</Menu.Item>
				)
			})}
		</Menu>
	)
}

const ContextIconButton = (props) => (
	<Button
		className="app-fab-button"
		size="large"
		icon={props.icon || <PlusOutlined />}
		shape="circle"
		type="primary"
		{...props} />
)

export const ContextButton = (props) => (
	<div className="app-fab">
		<ContextIconButton {...props} />
	</div>
)

/**
 * This is similar to the Foating Action Button from Material-UI. This button overlays the screen it's on.
 * the main prop is the menuOptions same format as the the navOptions passed into the NavBar component.
 * @param {Component} icon: icon to replace the button icon, default is '+'
 * @param {object} 		menuOptions: {
 *   {string} 		path: Route to go to when the item is selected
 *   {string} 		title: Value to appear on the menu
 *   {Ant Icon} 	Icon: The icon to show on the menu
 *   {() => void} action: You can pass a function to be called instead of going to the path.
 *   {boolean}		force: if set, will force the action or path without showing a dropdown
 * }
 */
export const ContextMenuButton = ({ menuOptions, ...props }) => {
	const history = useHistory();

	// If only one option, auto run the action or route to the path instead of showing the menu on click
	if (menuOptions && menuOptions.length === 1 && menuOptions[0].force) {
		const option = menuOptions[0];
		const action = option.action || (() => history.push(option.path));

		return (
			<ContextButton onClick={action} {...props} />
		);
	}

	return (
		<div className="app-fab">
			<Dropdown
				overlay={() => <ContextMenu menuOptions={menuOptions} {...props} />}
				placement="topRight"
				trigger={['click']}
			>
				<ContextIconButton />
			</Dropdown>
		</div>
	);
}
