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
              Content to be determined
            </div>
          </div>
        </div>
        <div className="row">
          <div className="md-6 column">
            <h2 className="card-title">Projects Summary</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
          <div className="md-6 column">
            <h2 className="card-title">Clients Summary</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;