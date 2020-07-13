import React from 'react';
import logo from  '../../Assets/Images/logo.png';
import tvshows from  '../../Assets/Images/tv-shows.jpg';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span>
          <img src={logo}></img>
          <span>Tv Shows Manager</span>
        </span>
      </div>
      <p>Manage your Tv Shows with our easy to use product</p>
      <div className="shows-image" ><img src={tvshows}></img></div>
    </div>
  );
};

export default Header;
