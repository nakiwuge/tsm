import React from 'react';
import NavBar from './NavBar';

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

const LayOut = ({ children, location }) => {
  const { pathname } = location;
  const urls = ['/login', '/signup'];
  const isAuthPage = urls.includes(pathname);

  return (
    <Layout className="layout">

      <div className="logo" />
      {!isAuthPage&&<NavBar />}
      <Content style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Tv Shows Manager</Footer>
    </Layout>
  );
};

export default LayOut;
