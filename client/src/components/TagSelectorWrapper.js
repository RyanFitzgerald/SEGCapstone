import React from 'react';
import TagSelector from 'tagselector';

class TagSelectorWrapper extends React.Component {
  componentDidMount() {
    this.selector = new TagSelector(this.selectField);
  }

  componentWillUnmount() {
    this.selector.destroy();
  }

  render() {
    return (
      <select name={this.props.name} id={this.props.id} ref={ele => this.selectField = ele} required={(this.props.required) ? true : false} multiple>
        {this.props.children}
      </select>
    );
  }
}

export default TagSelectorWrapper;