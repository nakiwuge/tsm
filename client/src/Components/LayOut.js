import React from 'react';
import NavBar from './NavBar';
import propTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;

const LayOut = ({ children, location }) => {
  const { pathname } = location;
  const urls = ['/login', '/signup'];
  const isAuthPage = urls.includes(pathname);

  return (
    <Layout className="layout" >
      <div className="logo" />
      {!isAuthPage&&<NavBar />}
      <Content >
        {children}
      </Content>

    </Layout>
  );
};

LayOut.propTypes={
  children:propTypes.element.isRequired,
  location:{
    pathname:propTypes.string.isRequired
  }
};

export default LayOut;
