import React from 'react';
import { Link } from 'react-router-dom';

const Submenu = (props) => {
  return (
    <div className="submenu">
      <div className="submenu__actions">
        <ul>
          <li><Link className={(props.activeSubtab === 1) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/users"><i className="fa fa-list" aria-hidden="true"></i> User Directory</Link></li>
          <li><Link className={(props.activeSubtab === 2) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/users/add"><i className="fa fa-plus" aria-hidden="true"></i> Add User</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;