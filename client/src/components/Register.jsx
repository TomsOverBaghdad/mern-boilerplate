import React from 'react';
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

const centerRegisterStyle = {
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  padding: "0px 16px"
};

const Register = (props) => (
    <div style={centerRegisterStyle}>
      <RegisterForm />
    </div>
);

const RegisterForm = (props) => {
  const { register } = useAuth();

  const onFinish = (values) => {
    register.execute(values);
  }

  return (
    <Form
      name="register"
      onFinish={onFinish}
      style={{ width: "100%", maxWidth: 430 }}
      size="large"
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input
          style={{ width: '100%' }} placeholder="First Name" maxLength={32} />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name' }]}
      >
        <Input style={{ width: '100%' }} placeholder="Last Name" maxLength={32} />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { type: 'email', message: 'Please use a valid email' },
          { required: true, message: 'We wont send you spam, promise!' }
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          maxLength={64} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Dont forget your password' },
          { min: 6, message: 'Please use a longer password' },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          maxLength={64} />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('Your passwords do not match');
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
          maxLength={64} />
      </Form.Item>
      <Form.Item
        {...register.error && {
          help: register.error.message,
          validateStatus: 'error',
        }}
      >
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
