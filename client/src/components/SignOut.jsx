import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAsync } from 'react-async-hook';

import { Typography } from 'antd';

import { useAuth } from '../useAuth';
import { ClientRoutes } from '../routes';

const { Title } = Typography;

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexFlow: 'row wrap',
  padding: "0px 16px"
};

// No need to redirect after the call, the useAuth resets the user
// and our routing layer will auto route to the right path
// there was a weird issue with setState that I couldn't just call signOut.execute()
// in useEffect, so I have to wrap it in a useAsync
const SignOut = (props) => {
  const { signOut } = useAuth();
  const signOutFetch = useAsync(() => signOut.execute(), [])

  if (signOutFetch.status === 'success') {
    return <Redirect to={ClientRoutes.home()} />;
  }

  if (signOutFetch.status === 'error') {
    return (
      <div style={centerStyle}>
        <Title>Error signing out. Try again.</Title>
      </div>
    );
  }

  return (
    <div style={centerStyle}>
      <Title>Signing out...</Title>
    </div>
  );
};

export default SignOut;
