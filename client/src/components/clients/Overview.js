import React from 'react';

class Overview extends React.Component {
  componentDidMount() {
    // Set title
    document.title = 'Client Overview | Renovaction';

    // Update tab
    this.props.setActiveSubtab(1);
  }

  render() {
    return (
      <div className="content">
          <div className="row">
              <div className="column">
                  <h2 className="card-title">Placeholder Title</h2>
                  <div className="card">
                    Content to be determined
                  </div>
              </div>
          </div>
          <div className="row">
            <div className="md-6 column">
                <h2 className="card-title">Placeholder Title</h2>
                <div className="card">
                  Content to be determined
                </div>
            </div>
            <div className="md-6 column">
                <h2 className="card-title">Placeholder Title</h2>
                <div className="card">
                  Content to be determined
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Overview;