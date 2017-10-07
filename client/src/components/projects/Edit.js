import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';
import moment from 'moment';

import TagSelectorWrapper from '../TagSelectorWrapper';
import PikadayWrapper from '../PikadayWrapper';

import Loading from '../Loading';

class Edit extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.getCents = this.getCents.bind(this);
    this.getDollars = this.getDollars.bind(this);
    this.contentLoaded = this.contentLoaded.bind(this);
    this.getProject = this.getProject.bind(this);

    // Set state
    this.state = {
      redirect: false,
      clients: false,
      types: false,
      project: false
    }
  }

  componentDidMount() {
    // Set title
    document.title = 'Edit Project | Renovaction';

    // Update tab
    this.props.setActiveSubtab(0);

    // Get project
    this.getProject(this.props.location.match.params.id);
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
    this.updateProject(project);
  }

  getProject(id) {
    api.getProject(id).then(project => {
      this.setState({ project }, () => {
        // Set title
        document.title = `Edit ${this.state.project.name} | Renovaction`;
      })
    });
  }

  updateProject(project) {
    api.updateProject(project, this.props.location.match.params.id).then(resp => {
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

  getDollars(cents) {
    const dollars = (cents/100).toFixed(2);
    let dollarString = dollars.toString().split('.');

    if (dollarString[0].length >= 4) {
      dollarString[0] = dollarString[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    return dollarString.join('.');
  }

  contentLoaded() {
    return this.state.clients && this.state.types && this.state.project;
  }

  render() {

    if (this.state.redirect) {
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
                    <input name="name" ref={input => this.name = input} className="form-text form-text--full" type="text" placeholder="E.g. Doe Roofing Project" defaultValue={this.state.project.name} required/>
                    <label className="form-label" htmlFor="client">Project Client <span className="form-required">*</span></label>
                    <span className="form-select">
                      <select name="client" ref={input => this.client = input} defaultValue={this.state.project.client.id} required>
                      {this.state.clients.map((client, key) => {
                        return <option key={key} value={client._id}>{client.name}</option>;
                      })}
                      </select>
                    </span>
                    <label className="form-label" htmlFor="client">Project Status <span className="form-required">*</span></label>
                    <span className="form-select">
                      <select name="client" ref={input => this.status = input} defaultValue={this.state.project.status} required>
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
                    <input name="street" ref={input => this.street = input} className="form-text form-text--full" type="text" defaultValue={this.state.project.street} required/>
                    <label className="form-label" htmlFor="postal-code">Postal Code <span className="form-required">*</span></label>
                    <input name="postal-code" ref={input => this.postalCode = input} className="form-text form-text--full capitalize" maxLength="6" type="text" defaultValue={this.state.project.postalCode} required/>
                    <label className="form-label" htmlFor="city">City <span className="form-required">*</span></label>
                    <span className="form-select" required>
                      <select name="city" ref={input => this.city = input} defaultValue={this.state.project.city}>
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
                    <PikadayWrapper name="sold-date" ref={input => this.soldDate = input} id="sold-date" defaultValue={moment(this.state.project.soldDate).format('MMMM DD, YY')} required="true"/>
                    <label className="form-label" htmlFor="cashin-date">Cashin Date</label>
                    <PikadayWrapper name="cashin-date" ref={input => this.cashinDate = input} id="cashin-date" defaultValue={(this.state.project.cashinDate) ? moment(this.state.project.cashinDate).format('MMMM DD, YY') : ''} />
                    <label className="form-label" htmlFor="start-date">Project Start Date</label> 
                    <PikadayWrapper name="start-date" ref={input => this.startDate = input} id="start-date" defaultValue={(this.state.project.startDate) ? moment(this.state.project.startDate).format('MMMM DD, YY') : ''} />
                    <label className="form-label" htmlFor="end-date">Project End Date</label>
                    <PikadayWrapper name="end-date" ref={input => this.endDate = input} id="end-date" defaultValue={(this.state.project.endDate) ? moment(this.state.project.endDate).format('MMMM DD, YY') : ''} />
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
                    <input name="labour-cost" ref={input => this.labourCost = input} defaultValue={this.getDollars(this.state.project.labourCost).replace(/,/g, '')} className="form-text form-text--full" type="number" step="0.01" />
                    <label className="form-label" htmlFor="materials-cost">Materials Cost</label>
                    <input name="materials-cost" ref={input => this.materialsCost = input} defaultValue={this.getDollars(this.state.project.materialsCost).replace(/,/g, '')} className="form-text form-text--full" type="number" step="0.01" />
                    <label className="form-label" htmlFor="actual-cost">Actual Cost</label>
                    <input name="actual-cost" ref={input => this.actualCost = input} defaultValue={this.getDollars(this.state.project.actualCost).replace(/,/g, '')} className="form-text form-text--full" type="number" step="0.01" />
                  </div>
                </div>
                <div className="text-center">
                  <input type="submit" className="btn btn--primary btn--large" value="Update Project" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    
  }
}

export default Edit;