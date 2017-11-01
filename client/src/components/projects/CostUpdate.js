import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

class CostUpdate extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUpdate = this.addUpdate.bind(this);
    this.getCents = this.getCents.bind(this);

    // Set state
    this.state = {
      redirect: null,
      formError: false
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Product | Renovaction';
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const update = {
      amount: this.getCents(this.amount.value),
      reason: this.reason.value,
      type: this.updateType.value,
      project: this.props.location.match.params.id,
      addedBy: JSON.parse(sessionStorage.getItem('user'))._id
    };

    // Call api
    this.addUpdate(update);
  }

  addUpdate(update) {
    api.addUpdate(update).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.setState({
        redirect: {
          location: `/projects/${this.props.location.match.params.id}`,
          message: 'Successfully added cost update!',
          type: 'success'
        }
      });      
    });
  }

  getCents(dollars) {
    return Math.round((Math.round(dollars * 100) / 100)*100);
  }
  
  render() {
    const id = this.props.location.match.params.id;
    let name = false;
    if (this.props.location.location && this.props.location.location.query) {
      name = this.props.location.location.query.name;
    }

    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location} />
      );
    }
    
    if (id && name) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add Cost Update For <b>{name}</b></h2>
              <div className="card">
              {this.props.renderError(this.state.formError)}
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Cost Update</h3>
                      <p>
                        Cost updates change the contract cost displayed for a project and a history of them is maintained on the project's page
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="name">Amount <span className="form-required">*</span></label>
                      <input name="amount" ref={input => this.amount = input} className="form-text form-text--full" type="number" step="0.01" required/>
                      <label className="form-label" htmlFor="reason">Reason <span className="form-required">*</span></label>
                      <input name="reason" ref={input => this.reason = input} className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="type">Type <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select name="type" ref={input => this.updateType = input} required>
                          <option value="Addition">Addition</option>
                          <option value="Subtraction">Subtraction</option>
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Update"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <Redirect to="/projects"/>
    );
  }
}

export default CostUpdate;