import React from 'react';
import { Link } from 'react-router-dom';

const Submenu = (props) => {
  return (
    <div className="submenu">
      <div className="submenu__actions">
        <ul>
          <li><Link className={(props.activeSubtab === 1) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/clients"><i className="fa fa-home" aria-hidden="true"></i> Overview</Link></li>
          <li><Link className={(props.activeSubtab === 2) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/clients/add"><i className="fa fa-plus" aria-hidden="true"></i> Add Client</Link></li>
          <li><Link className={(props.activeSubtab === 3) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/clients/list"><i className="fa fa-list" aria-hidden="true"></i> Client Directory</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;