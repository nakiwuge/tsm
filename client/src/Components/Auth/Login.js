import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Layout, Row, Col, message } from 'antd';
import AuthForm from './AuthForm';
import Header from './Header';

export const LOGIN = gql`
  mutation login($email: String!, $password:String!) {
    login(email: $email, password:$password){
     success
     token
     error
     email
    
    }
  }
`;

const Login = () => {
  const client= useApolloClient();
  const [login, { loading }] = useMutation(
    LOGIN,
    {
      onCompleted({ login }) {
        const {error, token, email, id}=login;
        if(error){
          return message.error(error);
        }
        if(token){
          localStorage.setItem('token', token);
          client.writeData({ data: { isLoggedIn: true, email, id, } });
          window.location.replace('/');
        }
      }
    }
  );
  const handleSubmit = (values)=>{
    const {email, password}=values;
    
    login({ variables: { email,password} });
  };
  return (
    <Layout className="auth">
      <Row justify="center">
        <Col span={10}>
          <Header />
        </Col>
        <Col span={14}>
          <h1>Login Here</h1>
          <AuthForm
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
