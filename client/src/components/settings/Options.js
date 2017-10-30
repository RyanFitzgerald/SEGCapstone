import React from 'react';

class Settings extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Settings | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(1);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">General Settings</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
          <div className="column">
            <h2 className="card-title">Add / Remove Types</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
          <div className="column">
            <h2 className="card-title">Add / Remove Roles</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;