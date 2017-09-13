import React from 'react';
import PropTypes from 'prop-types';
import TagSelector from 'tagselector';
import Pikaday from 'pikaday';
import '../../../node_modules/pikaday/css/pikaday.css';

class Add extends React.Component {
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

  render() {
    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Add a New Project</h2>
            <div className="card">
              <div className="row form-section">
                <div className="md-4 column form-section__title no-left">
                  <h3>Basic Information</h3>
                  <p>
                    Enter all the basic information about this project to help you identify it later
                  </p>
                </div>
                <div className="md-8 column no-right">
                  <label className="form-label" htmlFor="name">Project Nickname <span className="form-required">*</span></label>
                  <input name="name" className="form-text form-text--full" type="text" placeholder="E.g. Doe Roofing Project"/>
                  <label className="form-label" htmlFor="client">Project Client <span className="form-required">*</span></label>
                  <span className="form-select">
                    <select name="client">
                      <option>John Doe</option>
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
              <div className="row form-section">
                <div className="md-4 column form-section__title no-left">
                  <h3>Project Type</h3>
                  <p>
                    Enter all information about this project's type and associated subtypes (if applicable)
                  </p>
                </div>
                <div className="md-8 column no-right">
                  <label className="form-label" htmlFor="type">Main Type <span className="form-required">*</span></label>
                  <select name="type" id="project-type">
                    <option value="roofing">Roofing</option>
                    <option value="siding">Siding</option>
                    <option value="windows">Windows</option>
                    <option value="decks">Deck</option>
                    <option value="interior">Interior Renovation</option>
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
                  <input name="sold-date" id="sold-date" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="cashin-date">Cashin Date</label>
                  <input name="cashin-date" id="cashin-date" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="start-date">Project Start Date</label>
                  <input name="start-date" id="start-date" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="end-date">Project End Date</label>
                  <input name="end-date" id="end-date" className="form-text form-text--full" type="text"/>
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
                  <input name="labour-cost" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="materials-cost">Materials Cost</label>
                  <input name="materials-cost" className="form-text form-text--full" type="text"/>
                  <label className="form-label" htmlFor="actual-cost">Actual Cost</label>
                  <input name="actual-cost" className="form-text form-text--full" type="text"/>
                </div>
              </div>
              <div className="text-center">
                <input type="submit" className="btn btn--primary btn--large" value="Add Project" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Add.propTypes = {
  setActiveSubtab: PropTypes.func.isRequired
}

export default Add;