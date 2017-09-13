import React from 'react';
import PropTypes from 'prop-types';

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

Home.propTypes = {
  setActiveTab: PropTypes.func.isRequired
}

export default Home;