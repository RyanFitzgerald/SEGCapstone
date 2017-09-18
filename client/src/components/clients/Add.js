import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../../api';

class Add extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addClient = this.addClient.bind(this);
    this.handlePhone = this.handlePhone.bind(this);

    // Set state
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add Client | Renovaction';

    // Update tab
    this.props.setActiveSubtab(2);
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const client = {
      name: this.name.value,
      telephone: this.telephone.value,
      email: this.email.value,
      street: this.street.value,
      postalCode: this.postalCode.value,
      city: this.city.value
    };

    // Call api
    this.addClient(client);
  }

  addClient(client) {
    api.addClient(client).then(resp => {
      // Append id
      client._id = resp;

      // Update parent state
      this.props.addToClients(client);

      // Redirect
      this.setState({
        redirect: `/clients/${resp}`
      });
    });
  }

  handlePhone(e) {
    e.target.value = e.target.value.replace(/^(\d{3})(\d{3})(\d)+$/, '$1-$2-$3');
  }

  render() {
    if (!this.state.redirect) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add a New Client</h2>
              <div className="card">
                <form onSubmit={this.handleSubmit}>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Basic Information</h3>
                      <p>
                        Enter all the basic information about this client to help you identify them later
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="name"> Name <span className="form-required">*</span></label>
                      <input ref={input => this.name = input} name="name" className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="salesman">Sold by <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select ref={input => this.soldBy = input} name="salesman" required>
                          <option>John Doe</option>
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
                          <label className="form-label" htmlFor="email">Email <span className="form-required">*</span></label>
                          <input ref={input => this.email = input} name="email" className="form-text form-text--full" type="email" required/>
                          <label className="form-label" htmlFor="phone">Phone Number <span className="form-required">*</span></label>
                          <input ref={input => this.telephone = input} name="phone" className="form-text form-text--full" type="text" onKeyUp={this.handlePhone} maxLength="12" required/>
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
                      <label className="form-label" htmlFor="street">Street <span className="form-required">*</span></label>
                      <input ref={input => this.street = input} name="street" className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                      <input ref={input => this.postalCode = input} name="postal-code" className="form-text form-text--full capitalize" type="text" maxLength="6" required/>
                      <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select ref={input => this.city = input} name="city" required>
                          <option value="Ottawa">Ottawa</option>
                        </select>
                      </span>
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

    return (
      <Redirect to={this.state.redirect}/>
    );
  }
}

Add.propTypes = {
  setActiveSubtab: PropTypes.func.isRequired,
  addToClients: PropTypes.func.isRequired
};

export default Add;