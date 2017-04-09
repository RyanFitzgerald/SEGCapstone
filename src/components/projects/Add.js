import React, { Component, PropTypes } from 'react';
import Pikaday from 'pikaday';

class Add extends Component {

    componentDidMount() {
        // Update page title
        document.title = 'Add New Client';

        // Update Active Tab
        this.props.setHeaderTab(3);

        // Create datepickers
        new Pikaday({ field: document.getElementById('project-start') });
        new Pikaday({ field: document.getElementById('project-end') });
    }

    handleSubmit = e => {
        e.preventDefault();
        let newProject = {
            projectName: this.refs.projectName.value,
            projectDescription: this.refs.projectDescription.value,
            street: this.refs.street.value,
            postalCode: this.refs.postalCode.value,
            cityID: this.refs.city.value,
            startDate: (this.refs.startDate.value == '') ? '1990-01-01' : this.refs.startDate.value,
            endDate: (this.refs.endDate.value == '') ? '1990-01-01' : this.refs.endDate.value,
            estimatedCost:(this.refs.estimatedCost.value == '') ? -1 : this.refs.estimatedCost.value,
            finalCost: (this.refs.finalCost.value == '') ? -1 : this.refs.finalCost.value,
            clientID: this.refs.clientID.value,
            projectType: parseInt(this.refs.projectType.value)
        };
        this.props.addProject(newProject);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Add a New Project</h2>
                        <div id="project-add" className="dashboard-block">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="small-12 columns">
                                        <label htmlFor="project-name">Name <span className="required">*</span></label>
                                        <input type="text" ref="projectName" name="name" className="project-text-form" id="project-name" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-type">Type  <span className="required">*</span></label>
                                        <select name="type[]" ref="projectType" className="project-select-form" id="project-type" multiple required>
                                            {this.props.projectTypes.map(type => {
                                                return <option key={type.type_id} value={type.type_id}>{type.type}</option>;
                                            })}
                                        </select>
                                    </div>
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-description">Description</label>
                                        <textarea ref="projectDescription" name="description" className="project-textarea-form" id="project-description"></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="project-street">Street <span className="required">*</span></label>
                                        <input type="text" ref="street" name="street" className="project-text-form" id="project-street" required />
                                    </div>
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="project-postal-code">Postal Code <span className="required">*</span></label>
                                        <input type="text" ref="postalCode" name="postalCode" className="project-text-form" id="project-postal-code" required />
                                    </div>
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="project-city">City <span className="required">*</span></label>
                                        <select ref="city" name="city" className="client-select-form" id="client-city" required>
                                            {this.props.cities.map(city => {
                                                return <option key={city.city_id} value={city.city_id}>{city.city}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-start">Start Date</label>
                                        <input type="text" ref="startDate" name="startDate" className="project-text-form" id="project-start" readOnly />
                                    </div>
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-end">End Date</label>
                                        <input type="text" ref="endDate" name="endDate" className="project-text-form" id="project-end" readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-estimate">Estimated Cost ($)</label>
                                        <input type="text" ref="estimatedCost" name="estimatedCost" className="project-text-form" id="project-estimate" />
                                    </div>
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="project-cost">Final Cost ($)</label>
                                        <input type="text" ref="finalCost" name="finalCost" className="project-text-form" id="project-cost" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 columns">
                                        <label htmlFor="project-contract">Contract</label>
                                        <input type="file" ref="contract" name="contract" className="project-upload-form" id="project-contract" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 columns">
                                        <label htmlFor="project-client">Project Client <span className="required">*</span></label>
                                        <select ref="clientID" name="client" className="client-select-form" id="client-city" required>
                                            {this.props.clients.map(client => {
                                                return <option key={client.client_id} value={client.client_id}>{client.name}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <p className="required-info">Fields marked with * are required.</p>
                                <input type="submit" name="submit" className="btn" id="project-submit" value="Add Project" />
                            </form>
                        </div>
                        {/* <-- End #client-add --> */}
                    </div>
                </div>
            </div>
        );
    }
}

Add.propTypes = {
    setHeaderTab: PropTypes.func.isRequired,
    addProject: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
    projectTypes: PropTypes.array.isRequired
};

export default Add;
