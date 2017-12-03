import React from 'react';
import * as api from '../../api';

import Loading from '../Loading';

class Settings extends React.Component {
  constructor() {
    super();
    
    // Bind functions
    this.getReferrals = this.getReferrals.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    // Set state
    this.state = {
      referrals: false,
      formError: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Edit Referrals | Renovaction';

    // Update active tab
    this.props.setActiveSubtab(4);

    // Get types
    this.getReferrals();
  }

  getReferrals() {
    api.getReferrals({access_token: JSON.parse(localStorage.getItem('user')).access_token}).then(referrals => {
      this.setState({ referrals });
    });
  }

  handleAdd() {
    const input = this.name.value;

    // If there is no input, return
    if (!input) return;

    const referral = {
      name: input,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.addReferral(referral).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.getReferrals();
    });
  }

  handleDelete(id) {
    const referral = {
      id,
      access_token: JSON.parse(localStorage.getItem('user')).access_token
    };

    api.deleteReferral(referral).then(result => {
      if (result) {     
        this.getReferrals();
      }
    });
  }

  render() {

    if (!this.state.referrals) {
      return (
        <Loading />
      );
    }

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Edit Referral Types</h2>
            <div className="card">
            {this.props.renderError(this.state.formError)}
              <div className="row">
                <div className="md-4 column form-section__title no-left">
                  <h3>Client Referral</h3>
                  <p>
                    All or remove referral sources from the list
                  </p>
                </div>
                <div className="md-8 column no-right">
                  <div className="type-list">
                    <ul>
                    {this.state.referrals.map((referral, key) => {
                      return (
                        <li key={key}><span>{referral.name}</span> <i className="fa fa-times" aria-hidden="true" onClick={() => {if (window.confirm('Are you sure you want to delete this referral source?')) {this.handleDelete(referral._id)};}}></i></li>
                      );
                    })}
                    </ul>
                  </div>
                  <div className="type-add">
                    <input className="form-text" type="text" name="name" ref={input => this.name = input} placeholder="Enter Type Name"/>
                    <button onClick={this.handleAdd}>Add Referral Source</button>
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