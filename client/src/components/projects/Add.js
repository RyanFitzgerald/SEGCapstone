import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

import TagSelectorWrapper from '../TagSelectorWrapper';
import PikadayWrapper from '../PikadayWrapper';

import Loading from '../Loading';

class Add extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addProject = this.addProject.bind(this);
    this.getCents = this.getCents.bind(this);
    this.contentLoaded = this.contentLoaded.bind(this);

    // Set state
    this.state = {
      redirect: false,
      clients: false,
      types: false,
      formError: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Add Project | Renovaction';

    // Update tab
    this.props.setActiveSubtab(2);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clients !== null && nextProps.clients !== this.state.clients) {
      this.setState({ clients: nextProps.clients });
    }

    if (nextProps.types !== null && nextProps.types !== this.state.types) {
      this.setState({ types: nextProps.types });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let types = [];
    for (let i = 0; i < this.projectType.selectField.options.length; i++) {
      if (this.projectType.selectField.options[i].selected) {
        types.push(this.projectType.selectField.options[i].value);
      }
    }

    // Get form data
    const project = {
      name: this.name.value,
      street: this.street.value,
      postalCode: this.postalCode.value,
      city: this.city.value,
      soldDate: this.soldDate.field.value,
      startDate: this.startDate.field.value,
      endDate: this.endDate.field.value,
      cashinDate: this.cashinDate.field.value,
      labourCost: this.getCents(this.labourCost.value),
      materialsCost: this.getCents(this.materialsCost.value),
      actualCost: this.getCents(this.actualCost.value),
      status: this.status.value,
      type: types,
      client: this.client.value
    };

    // Call api
    this.addProject(project);
  }

  addProject(project) {
    api.addProject(project).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      // Update parent state
      this.props.getProjects();

      // Redirect
      this.setState({
        redirect: `/projects/${resp}`
      });
    });
  }

  getCents(dollars) {
    return Math.round((Math.round(dollars * 100) / 100)*100);
  }

  contentLoaded() {
    return this.state.clients && this.state.types;
  }

  render() {

    if (this.state.redirect) {
      this.props.addNotification('Successfully added project!', 'success');      
      return (
        <Redirect to={this.state.redirect}/>
      );
    }

    if (!this.contentLoaded()) {
      return (
        <Loading/>
      );
    }

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Add a New Project</h2>
            <div className="card">
            {this.props.renderError(this.state.formError)}
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
                      {this.state.clients.map((client, key) => {
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
                      Enter all information about this project's type(s)
                    </p>
                  </div>
                  <div className="md-8 column no-right">
                    <label className="form-label" htmlFor="type">Type(s) <span className="form-required">*</span></label>
                    <TagSelectorWrapper name="type" id="project-type" ref={input => this.projectType = input} required="true">
                      {this.state.types.map((type, key) => {
                        return <option key={key} value={type._id}>{type.name}</option>;
                      })}
                    </TagSelectorWrapper>
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
                    <PikadayWrapper name="sold-date" ref={input => this.soldDate = input} id="sold-date" required="true"/>
                    <label className="form-label" htmlFor="cashin-date">Cashin Date</label>
                    <PikadayWrapper name="cashin-date" ref={input => this.cashinDate = input} id="cashin-date" />
                    <label className="form-label" htmlFor="start-date">Project Start Date</label> 
                    <PikadayWrapper name="start-date" ref={input => this.startDate = input} id="start-date" />
                    <label className="form-label" htmlFor="end-date">Project End Date</label>
                    <PikadayWrapper name="end-date" ref={input => this.endDate = input} id="end-date" />
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
                    <input name="labour-cost" ref={input => this.labourCost = input} className="form-text form-text--full" type="number" step="0.01" />
                    <label className="form-label" htmlFor="materials-cost">Materials Cost</label>
                    <input name="materials-cost" ref={input => this.materialsCost = input} className="form-text form-text--full" type="number" step="0.01" />
                    <label className="form-label" htmlFor="actual-cost">Actual Cost</label>
                    <input name="actual-cost" ref={input => this.actualCost = input} className="form-text form-text--full" type="number" step="0.01" />
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
}

export default Add;