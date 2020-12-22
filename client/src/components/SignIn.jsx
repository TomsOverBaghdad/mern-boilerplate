import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Button,
  Input,
} from 'antd';
import {
  LockOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useAuth } from '../useAuth';
import { ClientRoutes } from '../routes';

const centerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexFlow: 'row wrap',
  padding: "0px 16px"
};

const SignIn = (props) => {
  const { signIn } = useAuth();
  const history = useHistory();

  const onFinish = (values) => signIn.execute(values);

  return (
    <div style={centerStyle}>
      <Form
        name="sign-in"
        onFinish={onFinish}
        style={{ width: "100%", maxWidth: 430 }}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'Please use a valid email' },
            { required: true, message: 'We need your email to sign you in' }
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Enter your email"
            maxLength={64} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Dont forget your password!' }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Enter your password"
            maxLength={64} />
        </Form.Item>
        <Form.Item
          {...signIn.error && {
            help: signIn.error.message,
            validateStatus: 'error',
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
            loading={signIn.loading}
          >
            Sign In
          </Button>
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} onClick={() => history.replace(ClientRoutes.register())}>
            Or Register Now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
