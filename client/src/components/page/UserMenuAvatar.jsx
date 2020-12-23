import React from 'react';
import {
	useHistory
} from "react-router-dom";
import {
	Avatar
} from 'antd';

import NavMenu from './NavMenu';
import { useAuth } from '../../useAuth';
import { ClientRoutes } from '../../routes';
import { primaryColor } from '../../variables.less';

const UserAvatar = ({ user }) => {
	const history = useHistory();
	const firstInitial = user.firstName[0].toUpperCase();
	const lastInitial = user.lastName[0].toUpperCase();
	const avatarTitle = firstInitial + lastInitial;
	return (
		<Avatar
			onClick={() => history.push(ClientRoutes.account())}
			style={{ backgroundColor: primaryColor, verticalAlign: 'middle' }}
			size="large"
		>
			{avatarTitle}
		</Avatar>
	);
}

const UserMenuAvatar = ({ selectedKeys }) => {
	let { user } = useAuth();

	let options = [
		{ path: ClientRoutes.signIn(), title: 'Sign In' },
		{ path: ClientRoutes.register(), title: 'Register' },
	];
	if (user) {
		options = [
			{ path: ClientRoutes.account(), component: <UserAvatar user={user} /> },
			// { path: ClientRoutes.signOut(), title: 'Sign Out' },
		];
	}

	return (
		<NavMenu
			mode="horizontal"
			options={options}
			selectedKeys={selectedKeys} />
	)
};

export default UserMenuAvatar;