import React from 'react';

class Stats extends React.Component {
  componentDidMount() {
    // Set Page Title
    document.title = 'Statistics | Renovaction';

    // Update tab
    this.props.setActiveTab(4);
  }

  render() {
    return (
      <div>
        test
      </div>
    );
  }
}

export default Stats;