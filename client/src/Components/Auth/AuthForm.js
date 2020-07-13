import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';

const layout = {
  labelCol: { span: 16 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const AuthForm = ({type,loading, handleSubmit}) => {

  return (
    <Form
      {...layout}
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      {type==='signup'&&<Form.Item
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please input your Cormfirm password!' }]}
      >
        <Input.Password />
      </Form.Item>}

      <Form.Item  >

        {type==='signup'
          ?<span>Arealdy Have an account?<Link to="/login">Login</Link></span>
          :<span>New member?<Link to="/signup">Signup</Link></span>}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {loading?<Spin/>:'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
};

AuthForm.propTypes={
  type:propTypes.string,
  loading:propTypes.bool.isRequired,
  handleSubmit:propTypes.func.isRequired
};

export default AuthForm;
