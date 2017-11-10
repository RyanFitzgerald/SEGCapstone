import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Home | Renovaction';

    // Update active tab
    this.props.setActiveTab(1);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Quick Actions</h2>
            <div className="card">
              <ul className="quick-actions">
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;