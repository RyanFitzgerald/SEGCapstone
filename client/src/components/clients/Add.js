import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

import Loading from '../Loading';

class Add extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClient = this.addClient.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

    // Set state
    this.state = {
      redirect: false,
      referrals: false,
      salesmen: false,
      formError: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add Client | Renovaction';

    // Update tab
    this.props.setActiveSubtab(2);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.referrals !== null && nextProps.referrals !== this.state.referrals) {
      this.setState({ referrals: nextProps.referrals });
    }

    if (nextProps.users && nextProps.users !== null && nextProps.users !== this.state.salesmen) {
      console.log(nextProps.users);
      const salesmen = nextProps.users.filter(user => user.role.name === 'Salesman');
      this.setState({ salesmen });
    }
  }

  componentWillUnmount() {
    this.setState({ redirect: false });
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const client = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      homePhone: this.homePhone.value,
      mobilePhone: this.mobilePhone.value,
      workPhone: this.workPhone.value,
      email: this.email.value,
      houseNumber: this.houseNumber.value,
      street: this.street.value,
      city: this.city.value,
      postalCode: this.postalCode.value,
      referral: this.referral.value,
      soldBy: this.soldBy.value,
      addedBy: JSON.parse(sessionStorage.getItem('user'))._id,
      access_token: JSON.parse(sessionStorage.getItem('user')).access_token
    };

    // Call api
    this.addClient(client);
  }

  addClient(client) {
    api.addClient(client).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        });
        console.log(resp);
        return;
      }

      // Append id
      client._id = resp;

      // Update parent state
      this.props.addToClients(client);

      // Redirect
      this.setState({
        redirect: {
          location: `/clients/${resp}`,
          message: 'Successfully added client!',
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
                    <input ref={input => this.firstName = input} name="firstName" className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="lastName"> Last Name <span className="form-required">*</span></label>
                    <input ref={input => this.lastName = input} name="lastName" className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="salesman">Sold by <span className="form-required">*</span></label>
                    <span className="form-select">
                      <select ref={input => this.soldBy = input} name="solBy" required>
                      {this.state.salesmen.map((salesman, key) => {
                        return <option key={key} value={salesman._id}>{salesman.name}</option>;
                      })}
                      </select>
                    </span>
                    <label className="form-label" htmlFor="salesman">Referred by <span className="form-required">*</span></label>
                    <span className="form-select">
                      <select ref={input => this.referral = input} name="referral" required>
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
                        <input ref={input => this.email = input} name="email" className="form-text form-text--full" type="email"/>
                        <label className="form-label" htmlFor="homePhone">Home Phone</label>
                        <input ref={input => this.homePhone = input} name="homePhone" className="form-text form-text--full" type="text" onKeyUp={this.handlePhone} maxLength="12"/>
                        <label className="form-label" htmlFor="mobilePhone">Mobile Phone</label>
                        <input ref={input => this.mobilePhone = input} name="mobilePhone" className="form-text form-text--full" type="text" onKeyUp={this.handlePhone} maxLength="12"/>
                        <label className="form-label" htmlFor="workPhone">Work Phone</label>
                        <input ref={input => this.workPhone = input} name="workPhone" className="form-text form-text--full" type="text" onKeyUp={this.handlePhone} maxLength="12"/>
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
                    <input ref={input => this.houseNumber = input} name="houseNumber" className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="street">Street <span className="form-required">*</span></label>
                    <input ref={input => this.street = input} name="street" className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                    <input ref={input => this.city = input} name="city" className="form-text form-text--full" type="text" required/>
                    <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                    <input ref={input => this.postalCode = input} name="postal-code" className="form-text form-text--full capitalize" type="text" maxLength="6" required/>
                  </div>
                </div>
                <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Client"/>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;