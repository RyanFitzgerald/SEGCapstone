import React, {Component, PropTypes} from 'react';

class Header extends Component {
    render() {
        return (
            <div id="header" className="clearfix">
                <div id="header-page-title">
                    <a href="#" id="sidebar-toggle"><i className="fa fa-bars" aria-hidden="true"></i></a>
                    <h1>{this.props.title}</h1>
                </div>
                {/* <!-- End header-page-title --> */}
                <div id="header-user-actions">
                    <ul>
                        <li className="hide-for-small-only">
                            <a href="#">Help Center</a>
                        </li>
                        <li className="hide-for-small-only">
                            <a href="#">Notifications</a>
                        </li>
                        <li id="user-select">
                            <a href="#">Ryan Fitzgerald <i className="fa fa-chevron-down" aria-hidden="true"></i></a>
                            <ul className="rounded shadow-medium" id="user-dropdown">
                                <li><a href="#" className="show-for-small-only">Help Center</a></li>
                                <li><a href="#" className="show-for-small-only">Notifications</a></li>
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Sign Out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                {/* <!-- End header-user --> */}
            </div>
        );
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header;
