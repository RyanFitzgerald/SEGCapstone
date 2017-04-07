import React, { Component, PropTypes } from 'react';

class Edit extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Update page title
        document.title = `Edit Client ${this.props.match.params.clientID}`;

        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Update Client</h2>
                        <div id="client-add" className="dashboard-block">
                            <div className="row">
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="client-first-name">First Name <span className="required">*</span></label>
                                    <input type="text" name="fName" className="client-text-form" id="client-first-name" required />
                                </div>
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="client-last-name">Last Name <span className="required">*</span></label>
                                    <input type="text" name="lName" className="client-text-form" id="client-last-name" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="client-email">Email</label>
                                    <input type="email" name="email" className="client-text-form" id="client-email" />
                                </div>
                                <div className="small-12 medium-6 columns">
                                    <label htmlFor="client-phone">Phone Number <span className="required">*</span></label>
                                    <input type="text" name="phone" className="client-text-form" id="client-phone" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="client-street">Street <span className="required">*</span></label>
                                    <input type="text" name="street" className="client-text-form" id="client-street" required />
                                </div>
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="client-postal-code">Postal Code <span className="required">*</span></label>
                                    <input type="text" name="postalCode" className="client-text-form" id="client-postal-code" required />
                                </div>
                                <div className="small-12 medium-4 columns">
                                    <label htmlFor="client-city">City <span className="required">*</span></label>
                                    <select name="city" className="client-select-form" id="client-city" required>
                                        <option value="Ottawa">Ottawa</option>
                                    </select>
                                </div>
                            </div>
                            <p className="required-info">Fields marked with * are required.</p>
                            <input type="submit" name="submit" className="btn" id="client-submit" value="Add Client" />
                        </div>
                        {/* <-- End #client-add -->*/}
                    </div>
                </div>
            </div>
        );
    }
}

Edit.propTypes = {
    match: PropTypes.any,
    setHeaderTab: PropTypes.func.isRequired
};

export default Edit;
