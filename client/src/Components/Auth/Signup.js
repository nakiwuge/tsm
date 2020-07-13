import React from 'react';
import {useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Layout, Row,Col, message } from 'antd';
import AuthForm from './AuthForm';
import Header from './Header';
import propTypes from 'prop-types';

export const SIGNUP = gql`
  mutation signup($email: String!, $password:String!, $confirmPassword:String!) {
    signup(email: $email, password:$password, confirmPassword:$confirmPassword){
     success
     error
    }
  }
`;

const Signup = ({history}) => {
  const [signup, { loading }] = useMutation(
    SIGNUP,
    {
      onCompleted({ signup }) {
        const {error, success}=signup;
        if(error){
          return message.error(error);
        }
        if(success){
          message.success('Registration was sucessful');
          history.push('/login');
        }
      }
    }
  );
  
  const handleSubmit = (values)=>{
    const {email, password, confirmPassword}=values;
    
    signup({ variables: { email,password,confirmPassword } });
  };

  return (
    <Layout className="auth">
      <Row justify="center">
        <Col span={10}>
          <Header/>
        </Col>
        <Col span={14}>
          <h1>Signup Here</h1>
          <AuthForm
            type='signup'
            loading={loading}
            handleSubmit={handleSubmit}
          />
        </Col>
      </Row>  
    </Layout>
  );
};

Signup.propTypes={
  history:{
    push:propTypes.func.isRequired
  }
};

export default Signup;
