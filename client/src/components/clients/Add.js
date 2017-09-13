import React from 'react';

class Add extends React.Component {
  componentDidMount() {
    this.props.setActiveSubtab(2);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Add a New Client</h2>
            <div className="card">
                <div className="row form-section">
                  <div className="md-4 column form-section__title no-left">
                    <h3>Basic Information</h3>
                    <p>
                      Enter all the basic information about this client to help you identify them later
                    </p>
                  </div>
                  <div className="md-8 column no-right">
                    <label className="form-label" htmlFor="first-name">First Name <span className="form-required">*</span></label>
                    <input name="first-name" className="form-text form-text--full" type="text"/>
                    <label className="form-label" htmlFor="last-name">Last Name <span className="form-required">*</span></label>
                    <input name="last-name" className="form-text form-text--full" type="text"/>
                    <label className="form-label" htmlFor="salesman">Sold by <span className="form-required">*</span></label>
                    <span className="form-select">
                      <select name="salesman">
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
                        <input name="email" className="form-text form-text--full" type="text"/>
                        <label className="form-label" htmlFor="phone">Phone Number <span className="form-required">*</span></label>
                        <input name="phone" className="form-text form-text--full" type="text"/>
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
                  <input name="street" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                  <input name="postal-code" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                  <span className="form-select">
                    <select name="city">
                      <option>Ottawa</option>
                    </select>
                  </span>
                </div>
              </div>
              <div className="text-center">
                  <input type="submit" className="btn btn--primary btn--large" value="Add Client"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;