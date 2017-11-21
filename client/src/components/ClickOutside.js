import React from 'react';

class ClickOutside extends React.Component {
  constructor(props) {
      super(props);

      // Bind functions
      this.setWrapperRef = this.setWrapperRef.bind(this);           
      this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
      this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.clickOutsideEvent();
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef}>
        {this.props.children}
      </div>
    );
  }
};

export default ClickOutside;