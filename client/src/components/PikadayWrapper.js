import React from 'react';
import Pikaday from 'pikaday';
import '../../node_modules/pikaday/css/pikaday.css';

class PikadayWrapper extends React.Component {
  componentDidMount() {
    this.picker = new Pikaday({
      field: this.field,
      format: 'MMMM DD, YYYY',
      onSelect: (date) => {
        let onSelect = this.props.onSelect || null;
        if (onSelect) this.props.onSelect();
      }
    });
  }

  componentWillUnmount() {
    this.picker.destroy();
  }

  render() {
    return (
      <input id={this.props.id} name={this.props.name} ref={input => this.field = input} defaultValue={this.props.defaultValue} className="form-text form-text--full" type="text" required={(this.props.required) ? true : false}/>
    );
  }
}

export default PikadayWrapper;