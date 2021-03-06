import React from 'react';
import { Link } from 'react-router-dom';

const Submenu = (props) => {
  return (
    <div className="submenu">
      <div className="submenu__actions">
        <ul>
          <li><Link className={(props.activeSubtab === 1) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/settings/types"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Types</Link></li>
          <li><Link className={(props.activeSubtab === 2) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/settings/users"><i className="fa fa-list" aria-hidden="true"></i> User Directory</Link></li>
          {JSON.parse(localStorage.getItem('user')).role.level >= 3 &&
          <li><Link className={(props.activeSubtab === 3) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/settings/users/add"><i className="fa fa-plus" aria-hidden="true"></i> Add User</Link></li>
          }
          <li><Link className={(props.activeSubtab === 4) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/settings/referrals"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Referrals</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;