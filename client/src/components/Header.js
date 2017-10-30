import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo.png';

function Header(props) {
  let menu, userMenu;

  function handleMenuToggle() {
    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
    } else {
      menu.classList.add('active');
    }
  }

  function handleUserMenuToggle() {
    if (userMenu.classList.contains('active')) {
      userMenu.classList.remove('active');
    } else {
      userMenu.classList.add('active');
    }
  }

  return (
    <div className="header clearfix">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="Renovaction" /></Link>
      </div>

      <div className="header__user">
        <span className="header__usertoggle" onClick={handleUserMenuToggle}>Hello, {props.user.name} <i className="fa fa-chevron-down" aria-hidden="true"></i></span>

        <ul ref={ele => userMenu = ele}>
            <li><Link to='/account'>Account Settings</Link></li>
            <li onClick={props.logout}><Link to="/">Logout</Link></li>
        </ul>

        <span className="header__menutoggle" onClick={handleMenuToggle}>
            <i className="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>

      <div className="header__nav" ref={ele => menu = ele}>
        <ul>
          <li><Link className={(props.activeTab === 1) ? 'header__link header__link--active' : 'header__link'} to="/">Home</Link></li>
          <li><Link className={(props.activeTab === 2) ? 'header__link header__link--active' : 'header__link'} to="/projects">Projects</Link></li>
          <li><Link className={(props.activeTab === 3) ? 'header__link header__link--active' : 'header__link'} to="/clients">Clients</Link></li>
          {props.checkLevel(props.level, 2) &&
          <li><Link className={(props.activeTab === 4) ? 'header__link header__link--active' : 'header__link'} to="/stats">Statistics</Link></li>
          }
          {props.checkLevel(props.level, 2) &&
          <li><Link className={(props.activeTab === 5) ? 'header__link header__link--active' : 'header__link'} to="/settings">Settings</Link></li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Header;