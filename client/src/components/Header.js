import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../logo.png';
import ClickOutside from './ClickOutside';

function Header(props) {
  let menu, userMenu, username, level;
  let sessionUser = JSON.parse(localStorage.getItem('user'));
  if (sessionUser) {
    username = sessionUser.name;
    level = sessionUser.role.level;
  } else {
    username = '';
    level = 0;
  }

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

  function closeMenu() {
    if (userMenu.classList.contains('active')) {
      userMenu.classList.remove('active');
    }
  }

  return (
    <div className="header clearfix">
      <div className="header__logo">
        <Link to="/"><img src={Logo} alt="Renovaction" /></Link>
      </div>

      <div className="header__user">
        <span className="header__usertoggle" onClick={handleUserMenuToggle}>Hello, {username} <i className="fa fa-chevron-down" aria-hidden="true"></i></span>

        <ClickOutside clickOutsideEvent={closeMenu}>
          <ul ref={ele => userMenu = ele} onClick={closeMenu}>
              <li><Link to='/account'>Account Settings</Link></li>
              <li onClick={props.logout}><Link to="/">Logout</Link></li>
          </ul>
        </ClickOutside>

        <span className="header__menutoggle" onClick={handleMenuToggle}>
            <i className="fa fa-bars" aria-hidden="true"></i>
        </span>
      </div>

      <div className="header__nav" ref={ele => menu = ele}>
        <ul>
          <li><Link className={(props.activeTab === 1) ? 'header__link header__link--active' : 'header__link'} to="/">Home</Link></li>
          <li><Link className={(props.activeTab === 2) ? 'header__link header__link--active' : 'header__link'} to="/projects">Projects</Link></li>
          <li><Link className={(props.activeTab === 3) ? 'header__link header__link--active' : 'header__link'} to="/clients">Clients</Link></li>
          {level >= 2 &&
          <li><Link className={(props.activeTab === 4) ? 'header__link header__link--active' : 'header__link'} to="/stats">Statistics</Link></li>
          }
          {level >= 2 &&
          <li><Link className={(props.activeTab === 5) ? 'header__link header__link--active' : 'header__link'} to="/settings/users">Settings</Link></li>
          }
        </ul>
      </div>
    </div>
  );
};

export default Header;