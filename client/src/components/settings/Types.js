import React from 'react';
import * as api from '../../api';

import Loading from '../Loading';

class Settings extends React.Component {
  constructor() {
    super();
    
    // Bind functions
    this.getTypes = this.getTypes.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // Set state
    this.state = {
      types: false,
      formError: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Edit Types | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(1);

    // Get types
    this.getTypes();
  }

  getTypes() {
    api.getTypes({access_token: JSON.parse(localStorage.getItem('user')).access_token}).then(types => {
      this.setState({ types });
    });
  }

  handleAdd() {
    const input = this.name.value;

    // If there is no input, return
    if (!input) return;

    const type = {
      name: input,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.addType(type).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.getTypes();
    });
  }

  handleDelete(id) {
    const type = {
      id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteType(type).then(result => {
      if (result) {     
        this.getTypes();
      }
    });
  }

  render() {

    if (!this.state.types) {
      return (
        <Loading />
      );
    }

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Edit Project Types</h2>
            <div className="card">
            {this.props.renderError(this.state.formError)}
              <div className="row">
                <div className="md-4 column form-section__title no-left">
                  <h3>Project Types</h3>
                  <p>
                    All or remove project types from the list
                  </p>
                </div>
                <div className="md-8 column no-right">
                  <div className="type-list">
                    <ul>
                    {this.state.types.map((type, key) => {
                      return (
                        <li key={key}><span>{type.name}</span> <i className="fa fa-times" aria-hidden="true" onClick={() => {if (window.confirm('Are you sure you want to delete this type?')) {this.handleDelete(type._id)};}}></i></li>
                      );
                    })}
                    </ul>
                  </div>
                  <div className="type-add">
                    <input className="form-text" type="text" name="name" ref={input => this.name = input} placeholder="Enter Type Name"/>
                    <button onClick={this.handleAdd}>Add Type</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;