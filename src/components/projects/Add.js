import React, { Component, PropTypes } from 'react';

class Add extends Component {

    componentDidMount() {
        // Update page title
        document.title = 'Add New Client';

        // Update Active Tab
        this.props.setHeaderTab(3);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Add a New Project</h2>
                        <div id="project-add" className="dashboard-block">
                            <div className="row">
                                <div className="small-12 columns">
                                    <label htmlFor="project-name">Name <span className="required">*</span></label>
                                    <input type="text" name="fName" className="project-text-form" id="project-name" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-type">Type  <span className="required">*</span></label>
                                    <select name="type" className="project-select-form" id="project-type" multiple required>
                                        <option value="Ottawa">Roofing</option>
                                        <option value="Ottawa">Siding</option>
                                        <option value="Ottawa">Other</option>
                                    </select>
                                </div>
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-description">Description</label>
                                    <textarea name="description" className="project-textarea-form" id="project-description"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="project-street">Street <span className="required">*</span></label>
                                    <input type="text" name="street" className="project-text-form" id="project-street" required />
                                </div>
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="project-postal-code">Postal Code <span className="required">*</span></label>
                                    <input type="text" name="postalCode" className="project-text-form" id="project-postal-code" required />
                                </div>
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="project-city">City <span className="required">*</span></label>
                                    <select name="city" className="project-select-form" id="project-city" required>
                                        <option value="Ottawa">Ottawa</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-start">Start Date</label>
                                    <input type="date" name="startDate" className="project-text-form" id="project-start" />
                                </div>
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-end">End Date</label>
                                    <input type="date" name="endDate" className="project-text-form" id="project-end" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-estimate">Estimated Cost ($)</label>
                                    <input type="text" name="estimatedCost" className="project-text-form" id="project-estimate" />
                                </div>
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="project-cost">Actual Cost ($)</label>
                                    <input type="text" name="actualCost" className="project-text-form" id="project-cost" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <label htmlFor="project-contract">Contract</label>
                                    <input type="file" name="contract" className="project-upload-form" id="project-contract" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 columns">
                                    <label htmlFor="project-client">Project Client <span className="required">*</span></label>
                                    <input type="text" name="estimatedCost" className="project-text-form" id="project-client" required />
                                </div>
                            </div>
                            <p className="required-info">Fields marked with * are required.</p>
                            <input type="submit" name="submit" className="btn" id="project-submit" value="Add Project" />
                        </div>
                        {/* <-- End #client-add --> */}
                    </div>
                </div>
            </div>
        );
    }
}

Add.propTypes = {
    setHeaderTab: PropTypes.func.isRequired
};

export default Add;
