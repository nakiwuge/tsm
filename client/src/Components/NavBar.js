import React from 'react';
import { Layout, Menu, } from 'antd';
import {Link } from 'react-router-dom';
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
        <Menu.Item key="home"><Link to="/">TV Shows</Link></Menu.Item>
        <Menu.Item key="watch-list"><Link to="/watch-list">Whatch List</Link> </Menu.Item>
        <Menu.Item id="logout" key="logout" onClick={()=>authService.logoutUser()}> 
          Log out
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default NavBar;
