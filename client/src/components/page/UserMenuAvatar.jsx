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

const UserMenuAvatar = (props) => {
  let { user } = useAuth();
  const history = useHistory();

  if (!user) {
    const loginOptions = [
      { path: ClientRoutes.signIn(), title: 'Sign In' },
      { path: ClientRoutes.register(), title: 'Register' },
    ];
    return (
      <NavMenu
        mode="horizontal"
        options={loginOptions}
        selectedKeys={props.selectedKeys} />
    )
  }

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
};

export default UserMenuAvatar;