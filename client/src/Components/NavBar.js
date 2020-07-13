import React from 'react';
import { Layout, Menu } from 'antd';
import logo from '../Assets/Images/logo-small.png';
import { authService } from '../Utils/authService';
const { Header } = Layout;

const NavBar = () => {

  return (
    <Header className="nav-bar">
      <div className="logo-nav">
        <img src={logo}></img>
      </div>
      <Menu  mode="horizontal" defaultSelectedKeys={['home']}>
        <Menu.Item key="home">TV Shows</Menu.Item>
        <Menu.Item key="watch-list">Whatch List</Menu.Item>
        <Menu.Item id="logout" key="logout" onClick={()=>authService.logoutUser()}>Log out</Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
