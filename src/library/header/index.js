import React, { useState  } from 'react';
import { NavLink } from "react-router-dom";
import './index.scss';

const Header = () => {
  const [isNavActive, setNavActive] = useState(false);
  let headerClassName = 'header';
  if (isNavActive) {
    headerClassName = 'header header-active';
  }

  return (
    <div className={headerClassName}>
      <div className="container">
        <div className="header__logo">
          <img src="/assets/images/logo.png" alt="" width={44} height={57} />
          <h1>Geoportal Demo BIG</h1>
          <div
            className="header__nav-handle"
            onClick={() => setNavActive(!isNavActive)}
          >
            <span className="icon-list" />
          </div>
        </div>
        <div className="header__nav">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/jelajah/">Jelajah</NavLink>
          <NavLink activeClassName="active" to="/pencarian/">Pencarian</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;
