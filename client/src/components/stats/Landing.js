import React from 'react';

class Landing extends React.Component {
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
            <h2 className="card-title">Title</h2>
            <div className="card">
              Content to be determined
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;