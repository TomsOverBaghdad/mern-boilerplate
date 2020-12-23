import React from 'react';
import {
	Redirect,
} from "react-router-dom";
import { Descriptions } from 'antd';

import { useAuth } from '../useAuth';
import { ClientRoutes } from '../routes';

const Account = (props) => {
	let { user } = useAuth();

	if (!user) {
		return <Redirect to={ClientRoutes.home()} />
	}
	return (
		<div style={{ padding: '16px 32px', }}>
			<Descriptions title="Account Info">
				<Descriptions.Item label="First Name">{user.firstName}</Descriptions.Item>
				<Descriptions.Item label="Last Name">{user.lastName}</Descriptions.Item>
				<Descriptions.Item label="Email">{user.email}</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default Account;
