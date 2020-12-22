import React, { useState } from 'react';
import {
  useHistory,
} from "react-router-dom";
import {
  Button,
  Drawer,
} from 'antd';
import {
  ArrowLeftOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import {
  Link
} from 'react-router-dom';

import NavMenu from './NavMenu';
import UserMenuAvatar from './UserMenuAvatar';

import { ClientRoutes } from '../../routes';
import logo from '../../logo.png';
import './NavBar.less';

const Logo = () => (
  <Link to={ClientRoutes.home()}>
    <img src={logo} alt="logo" width="60" height="32" />
  </Link>
);

/**
 * The navbar is designed to be responsive to screen sizes using ant-design.
 * The left-content has the back button, logo, and actions/pages for the user to go to.
 * The right-content has the sign-in and register as well as the menu icon button to
 * open up a drawer for more menu options
 */
const NavBar = ({profile, drawerOptions = [], selectedKeys}) => {
  const [showDrawer, setDrawerVisibility] = useState(false);
  const history = useHistory();

  return (
    <nav className="app-nav-bar">
      <div className="left-content">
        <div className="app-nav-back-button">
          <Button
            type="text"
            icon={<ArrowLeftOutlined className="app-nav-bar-icon" />}
            size="large"
            onClick={() => history.goBack()} />
        </div>
        <Logo />
      </div>
      <div className="right-content">
        <UserMenuAvatar selectedKeys={selectedKeys} />
        <Button
          className="app-hamburger-menu"
          type="text"
          icon={<MenuOutlined className="app-nav-bar-icon" />}
          onClick={() => setDrawerVisibility(true)}
          size="large" />
        <Drawer
          placement="right"
          closable={false}
          onClose={() => setDrawerVisibility(false)}
          visible={showDrawer}
        >
          <NavMenu
            mode="inline"
            options={drawerOptions}
            selectedKeys={selectedKeys} />
        </Drawer>
      </div>
    </nav>
  );
};

export default NavBar;
