import React from 'react';
// import {
//   // menu icons
//   HomeOutlined,
//   CalendarOutlined,
//   TeamOutlined,
//   ClockCircleOutlined,
// } from '@ant-design/icons';

import NavBar from './NavBar';
// import FooterBar from './FooterBar';

import { useAuth } from '../../useAuth';
import { ClientRoutes } from '../../routes';

const Page = (props) => {
  let { user } = useAuth();

  let drawerOptions = [
    // {path: ClientRoutes.contactUs(), title: 'Contact Us'},
    // {path: ClientRoutes.home(), title: 'Home', Icon: HomeOutlined},
    // {path: ClientRoutes.calendar(), title: 'Calendar', Icon: CalendarOutlined},
  ];

  if (!user) {
    drawerOptions.concat([
      { path: ClientRoutes.signIn(), title: 'Sign In' },
      { path: ClientRoutes.register(), title: 'Register' },
    ]);
  }
  
  return (
    <React.Fragment>
      <header>
        <NavBar drawerOptions={drawerOptions} />
      </header>
      <main>
        {props.children}
      </main>
      {/*
      Not putting in the footer yet, no other actions or pages are real right now
      WHEN WE UNCOMMENT, fix the ContextMenuButton to be responseive with it
      <footer>
        <FooterBar options={leftNavOptions}/>
      </footer>*/}
    </React.Fragment>
  );
};

export default Page;
