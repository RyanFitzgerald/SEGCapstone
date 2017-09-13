import React from 'react';
import PropTypes from 'prop-types';

class Overview extends React.Component {
  componentDidMount() {
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

Overview.propTypes = {
  setActiveSubtab: PropTypes.func.isRequired
};

export default Overview;