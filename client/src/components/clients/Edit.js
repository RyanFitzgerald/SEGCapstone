import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

import Loading from '../Loading';

class Edit extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getClient = this.getClient.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

    // Set state
    this.state = {
      redirect: false,
      client: null,
      referrals: false,
      salesmen: false,
      formError: false
    }
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Get client
    this.getClient(this.props.location.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.referrals !== null && nextProps.referrals !== this.state.referrals) {
      this.setState({ referrals: nextProps.referrals });
    }

    if (nextProps.users && nextProps.users !== null && nextProps.users !== this.state.salesmen) {
      const salesmen = nextProps.users.filter(user => user.role.name === 'Salesman');
      this.setState({ salesmen });
    }
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const client = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      soldBy: this.soldBy.value,
      referral: this.referral.value,
      homePhone: this.homePhone.value,
      mobilePhone: this.mobilePhone.value,
      workPhone: this.workPhone.value,
      email: this.email.value,
      houseNumber: this.houseNumber.value,
      street: this.street.value,
      city: this.city.value,
      postalCode: this.postalCode.value,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    // Call api
    this.updateClient(client);
  }

  getClient(id) {
    const query = {
      id,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    }

    api.getClient(query).then(client => {
      this.setState({ client }, () => {
        // Set title
        document.title = `Edit ${this.state.client.firstName} ${this.state.client.lastName} | Renovaction`;
      })
    });
  }

  updateClient(client) {
    api.updateClient(client, this.props.location.match.params.id).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      // Update parent state
      this.props.updateClients(resp);

      // Redirect
      this.setState({
        redirect: {
          location: `/clients/${resp._id}`,
          message: 'Successfully updated client!',
          type: 'success'
        }
      });
    });
  }

  handlePhone(e) {
    e.target.value = e.target.value.replace(/^(\d{3})(\d{3})(\d)+$/, '$1-$2-$3');
  }

  render() {
    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location}/>
      );
    }

    if (!(this.state.referrals && this.state.salesmen)) {
      return (
        <Loading/>
      );
    }

    if (this.state.client) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add a New Client</h2>
              <div className="card">
                {this.props.renderError(this.state.formError)}
                <form onSubmit={this.handleSubmit}>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Basic Information</h3>
                      <p>
                        Enter all the basic information about this client to help you identify them later
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="firstName"> First Name <span className="form-required">*</span></label>
                      <input ref={input => this.firstName = input} name="firstName" className="form-text form-text--full" type="text" defaultValue={this.state.client.firstName} required />
                      <label className="form-label" htmlFor="lastName"> Last Name <span className="form-required">*</span></label>
                      <input ref={input => this.lastName = input} name="lastName" className="form-text form-text--full" type="text" defaultValue={this.state.client.lastName} required />
                      <label className="form-label" htmlFor="salesman">Sold by <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select ref={input => this.soldBy = input} name="salesman" defaultValue={this.state.client.soldBy._id} required>
                        {this.state.salesmen.map((salesman, key) => {
                          return <option key={key} value={salesman._id}>{salesman.name}</option>;
                        })}
                        </select>
                      </span>
                      <label className="form-label" htmlFor="salesman">Referred by <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select ref={input => this.referral = input} name="referral" defaultValue={this.state.client.referral._id} required>
                        {this.state.referrals.map((referral, key) => {
                          return <option key={key} value={referral._id}>{referral.name}</option>;
                        })}
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className="row form-section">
                      <div className="md-4 column form-section__title no-left">
                          <h3>Contact Information</h3>
                          <p>
                              Enter all the contact information about this client
                          </p>
                      </div>
                      <div className="md-8 column no-right">
                          <label className="form-label" htmlFor="email">Email</label>
                          <input ref={input => this.email = input} name="email" className="form-text form-text--full" type="email" defaultValue={this.state.client.email}/>
                          <label className="form-label" htmlFor="homePhone">Home Phone</label>
                        <input ref={input => this.homePhone = input} name="homePhone" className="form-text form-text--full" type="text" defaultValue={this.state.client.homePhone} onKeyUp={this.handlePhone} maxLength="12"/>
                        <label className="form-label" htmlFor="mobilePhone">Mobile Phone</label>
                        <input ref={input => this.mobilePhone = input} name="mobilePhone" className="form-text form-text--full" type="text" defaultValue={this.state.client.mobilePhone} onKeyUp={this.handlePhone} maxLength="12"/>
                        <label className="form-label" htmlFor="workPhone">Work Phone</label>
                        <input ref={input => this.workPhone = input} name="workPhone" className="form-text form-text--full" type="text" defaultValue={this.state.client.workPhone} onKeyUp={this.handlePhone} maxLength="12"/>
                      </div>
                  </div>
                  <div className="row form-section no-border">
                    <div className="md-4 column form-section__title no-left">
                        <h3>Client Location</h3>
                        <p>
                            Enter all the information associated with the location of this client
                        </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="houseNumber">House Number <span className="form-required">*</span></label>
                      <input ref={input => this.houseNumber = input} name="houseNumber" className="form-text form-text--full" type="text" defaultValue={this.state.client.houseNumber} required/>
                      <label className="form-label" htmlFor="street">Street <span className="form-required">*</span></label>
                      <input ref={input => this.street = input} name="street" className="form-text form-text--full" type="text" defaultValue={this.state.client.street} required/>
                      <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                      <input ref={input => this.city = input} name="city" className="form-text form-text--full" type="text" defaultValue={this.state.client.city} required/>
                      <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                      <input ref={input => this.postalCode = input} name="postal-code" className="form-text form-text--full capitalize" type="text" maxLength="6" defaultValue={this.state.client.postalCode} required/>
                    </div>
                  </div>
                  <div className="text-center">
                      <input type="submit" className="btn btn--primary btn--large" value="Update Client"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Loading/>
    );
  }
}

export default Edit;