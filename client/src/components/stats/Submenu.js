import React from 'react';
import { Link } from 'react-router-dom';

const Submenu = (props) => {
  return (
    <div className="submenu">
      <div className="submenu__actions">
        <ul>
          <li><Link className={(props.activeSubtab === 1) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/stats"><i className="fa fa-line-chart" aria-hidden="true"></i> Total Volume</Link></li>
          <li><Link className={(props.activeSubtab === 2) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/stats/type"><i className="fa fa-line-chart" aria-hidden="true"></i> Type Volume</Link></li>
          <li><Link className={(props.activeSubtab === 3) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/stats/salesmen"><i className="fa fa-line-chart" aria-hidden="true"></i> Salesmen Volume</Link></li>
          <li><Link className={(props.activeSubtab === 4) ? 'submenu__action submenu__action--active' : 'submenu__action'} to="/stats/referral"><i className="fa fa-line-chart" aria-hidden="true"></i> Referral Volume</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Submenu;