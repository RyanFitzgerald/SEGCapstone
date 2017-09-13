import React from 'react';
import {Link} from 'react-router-dom';

const Header = (props) => {
    return (
        <div className="header clearfix">
            <div className="header__logo">
                <Link to="/"><img src="logo.png" alt="Renovaction" /></Link>
            </div>

            <div className="header__user">
                <a className="header__usertoggle" href="#">Hello, Ryan <i className="fa fa-chevron-down" aria-hidden="true"></i></a>

                <ul>
                    <li><Link to="/account">Account Settings</Link></li>
                    <li><a href="#">Logout</a></li>
                </ul>

                <span className="header__menutoggle">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </span>
            </div>

            <div className="header__nav">
                <ul>
                    <li><Link className={(props.activeTab === 1) ? 'header__link header__link--active' : 'header__link'} to="/">Home</Link></li>
                    <li><Link className={(props.activeTab === 2) ? 'header__link header__link--active' : 'header__link'} to="/projects">Projects</Link></li>
                    <li><Link className={(props.activeTab === 3) ? 'header__link header__link--active' : 'header__link'} to="/clients">Clients</Link></li>
                    <li><Link className={(props.activeTab === 4) ? 'header__link header__link--active' : 'header__link'} to="/stats">Statistics</Link></li>
                    <li><Link className={(props.activeTab === 5) ? 'header__link header__link--active' : 'header__link'} to="/settings">Settings</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;