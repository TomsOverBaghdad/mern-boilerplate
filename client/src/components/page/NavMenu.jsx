import React from 'react';
import {
	Link,
	useLocation
} from "react-router-dom";
import classNames from 'classnames';
import {
	Menu,
} from 'antd';

import './NavMenu.less';

/**
 * NavMenu wraps the antd menu and is used for the nav bar and footer bar
 * keeps track of the selected item via react router's useLocation hook
 * applies necessary styles for different cases of use
 */
const NavMenu = (props) => {
	const { pathname } = useLocation();
	const selectedKeys = [pathname];

	if (!props.options || !props.options.length) return null;

	const mode = props.mode || "horizontal";
	const iconOnly = props.iconOnly;
	const titleOnly = !iconOnly && props.titleOnly;

	const showTitle = !iconOnly || titleOnly;

	let wrapperClassName = classNames({
		'nav-menu-wrapper': true,
		'is-left-nav': props.isLeftNav,
		'bottom': props.bottom,
	});

	return (
		<div className={wrapperClassName}>
			<Menu mode={mode} selectedKeys={selectedKeys}>
				{props.options.map(({ Icon, title, path, component }, i) => {
					const showIcon = Icon && (iconOnly || !titleOnly)
					const iconClass = classNames({
						"nav-menu-item-icon-only": iconOnly,
					})
					console.log("sdf", showIcon)
					return (
						<Menu.Item
							key={path}
							title={title || ""}
							icon={showIcon && <Icon className={iconClass} />}
						>
							{component || (showTitle && title)}
							<Link to={path} />
						</Menu.Item>
					)
				})}
			</Menu>
		</div>
	);
};

export default NavMenu;
