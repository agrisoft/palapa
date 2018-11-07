import React from 'react';
import { NavLink } from "react-router-dom";
import './index.css';

const Header = () => (
  <div className="header">
    <div className="container">
      <div className="header__logo">
        <img src="/assets/images/logo.png" alt="" width={44} height={57} />
        <h1>Geoportal Demo BIG</h1>
      </div>
      <div className="header__nav">
        <NavLink exact activeClassName="active" to="/">Home</NavLink>
        <NavLink activeClassName="active" to="/jelajah/">Jelajah</NavLink>
        <NavLink activeClassName="active" to="/pencarian/">Pencarian</NavLink>
      </div>
    </div>
  </div>
);

export default Header;
