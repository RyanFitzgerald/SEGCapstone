import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Home | Renovaction';

    // Update active tab
    this.props.setActiveTab(1);
  }

  render() {
    const level = JSON.parse(sessionStorage.getItem('user')).role.level;
    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Quick Actions</h2>
            <div className="card">
              <ul className="quick-actions">
                <li><Link to="/projects"><i className="fa fa-building" aria-hidden="true"></i> View Projects</Link></li>
                {level >= 2 &&
                <li><Link to="/projects/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Project</Link></li>
                }
                <li><Link to="/clients"><i className="fa fa-address-card" aria-hidden="true"></i> View Clients</Link></li>
                {level >= 2 &&
                <li><Link to="/clients/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add Client</Link></li>
                }
                {level >= 2 &&
                <li><Link to="/settings/users"><i className="fa fa-user" aria-hidden="true"></i> View Users</Link></li>
                }
                {level >= 3 &&
                <li><Link to="/settings/users/add"><i className="fa fa-plus-square" aria-hidden="true"></i> Add User</Link></li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;