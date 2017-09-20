import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../../api';
import TagSelector from 'tagselector';
import Pikaday from 'pikaday';
import '../../../node_modules/pikaday/css/pikaday.css';

class Add extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addProject = this.addProject.bind(this);

    // Set state
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add Project | Renovaction';

    // Update tab
    this.props.setActiveSubtab(2);

    // Create tagselector
    let projectType = new TagSelector('project-type');
    let projectSubType = new TagSelector('project-subtype');

    // Create pikaday
    let soldDate = new Pikaday({field: document.getElementById('sold-date'), format: 'MMMM DD, YYYY'});
    let cashinDate = new Pikaday({field: document.getElementById('cashin-date'), format: 'MMMM DD, YYYY'});
    let startDate = new Pikaday({field: document.getElementById('start-date'), format: 'MMMM DD, YYYY'});
    let endDate = new Pikaday({field: document.getElementById('end-date'), format: 'MMMM DD, YYYY'});
  }

  handleSubmit(e) {
    e.preventDefault();

    let types = [];
    for (let i = 0; i < this.type.options.length; i++) {
      if (this.type.options[i].selected) {
        types.push(this.type.options[i].value);
      }
    }

    // Get form data
    const project = {
      name: this.name.value,
      street: this.street.value,
      postalCode: this.postalCode.value,
      city: this.city.value,
      soldDate: this.soldDate.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      cashinDate: this.cashinDate.value,
      labourCost: this.labourCost.value,
      materialsCost: this.materialsCost.value,
      actualCost: this.actualCost.value,
      status: this.status.value,
      type: types,
      client: this.client.value
    };

    // Call api
    this.addProject(project);
  }

  addProject(project) {
    api.addProject(project).then(resp => {
      // Append id
      project._id = resp;

      // Update parent state
      //this.props.addToProjects(project);

      // Redirect
      this.setState({
        redirect: `/projects/${resp}`
      });
    });
  }

  render() {
    // Define variables
    const types = this.props.types || [];
    const clients = this.props.clients || [];

    if (!this.state.redirect) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add a New Project</h2>
              <div className="card">
                <form onSubmit={this.handleSubmit}>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Basic Information</h3>
                      <p>
                        Enter all the basic information about this project to help you identify it later
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="name">Project Nickname <span className="form-required">*</span></label>
                      <input name="name" ref={input => this.name = input} className="form-text form-text--full" type="text" placeholder="E.g. Doe Roofing Project" required/>
                      <label className="form-label" htmlFor="client">Project Client <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select name="client" ref={input => this.client = input} required>
                        {clients.map((client, key) => {
                          return <option key={key} value={client._id}>{client.name}</option>;
                        })}
                        </select>
                      </span>
                      <label className="form-label" htmlFor="client">Project Status <span className="form-required">*</span></label>
                      <span className="form-select">
                        <select name="client" ref={input => this.status = input} required>
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Complete">Complete</option>
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Project Location</h3>
                      <p>
                        Enter all the information associated with the location of this project
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="street">Street <span className="form-required">*</span></label>
                      <input name="street" ref={input => this.street = input} className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                      <input name="postal-code" ref={input => this.postalCode = input} className="form-text form-text--full capitalize" maxLength="6" type="text" required/>
                      <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                      <span className="form-select" required>
                        <select name="city" ref={input => this.city = input}>
                          <option value="Ottawa">Ottawa</option>
                        </select>
                      </span>
                    </div>
                  </div>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Project Type</h3>
                      <p>
                        Enter all information about this project's type and associated subtypes (if applicable)
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="type">Main Type <span className="form-required">*</span></label>
                      <select name="type" id="project-type" ref={input => this.type = input} required>
                        {types.map((type, key) => {
                          return <option key={key} value={type._id}>{type.name}</option>;
                        })}
                      </select>
                      <label className="form-label" htmlFor="subtype">Sub Type</label>
                      <select name="subtype" id="project-subtype">
                        <option value="1">Kitchen</option>
                        <option value="2">Bathroom</option>
                        <option value="3">Baseroom</option>
                        <option value="4">Flooring</option>
                        <option value="5">Miscellaneous</option>                
                      </select>
                    </div>
                  </div>
                  <div className="row form-section">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Project Dates</h3>
                      <p>
                        Enter all known date information associated with this project (Format: January 1, 2017)
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="sold-date">Sold Date <span className="form-required">*</span></label>
                      <input name="sold-date" ref={input => this.soldDate = input} id="sold-date" className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="cashin-date">Cashin Date</label>
                      <input name="cashin-date" ref={input => this.cashinDate = input} id="cashin-date" className="form-text form-text--full" type="text"/>
                      <label className="form-label" htmlFor="start-date">Project Start Date</label>
                      <input name="start-date" ref={input => this.startDate = input} id="start-date" className="form-text form-text--full" type="text"/>
                      <label className="form-label" htmlFor="end-date">Project End Date</label>
                      <input name="end-date" ref={input => this.endDate = input} id="end-date" className="form-text form-text--full" type="text"/>
                    </div>
                  </div>
                  <div className="row form-section no-border">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Project Costs</h3>
                      <p>
                        Enter all known cost information associated with this project
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="labour-cost">Labour Cost</label>
                      <input name="labour-cost" ref={input => this.labourCost = input} className="form-text form-text--full" type="text"/>
                      <label className="form-label" htmlFor="materials-cost">Materials Cost</label>
                      <input name="materials-cost" ref={input => this.materialsCost = input} className="form-text form-text--full" type="text"/>
                      <label className="form-label" htmlFor="actual-cost">Actual Cost</label>
                      <input name="actual-cost" ref={input => this.actualCost = input} className="form-text form-text--full" type="text"/>
                    </div>
                  </div>
                  <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Project" />
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
  types: PropTypes.array.isRequired
}

export default Add;