import React, { Component, PropTypes } from 'react';

class Add extends Component {

    componentDidMount() {
        // Update page title
        document.title = 'Add New Client';

        // Update Active Tab
        this.props.setHeaderTab(3);
    }

    handleSubmit = e => {
        e.preventDefault();
        let newClient = {
            clientName: `${this.refs.fName.value} ${this.refs.lName.value}`,
            email: this.refs.email.value,
            telephone: this.refs.phone.value,
            street: this.refs.street.value,
            postalCode: this.refs.postalCode.value,
            cityID: this.refs.city.value
        };
        this.props.addClient(newClient);
    };

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Add a New Client</h2>
                        <div id="client-add" className="dashboard-block">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="client-first-name">First Name <span className="required">*</span></label>
                                        <input type="text" ref="fName" name="fName" className="client-text-form" id="client-first-name" required />
                                    </div>
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="client-last-name">Last Name <span className="required">*</span></label>
                                        <input type="text" ref="lName" name="lName" className="client-text-form" id="client-last-name" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="client-email">Email</label>
                                        <input type="email" ref="email" name="email" className="client-text-form" id="client-email" />
                                    </div>
                                    <div className="small-12 medium-6 columns">
                                        <label htmlFor="client-phone">Phone Number <span className="required">*</span></label>
                                        <input type="text" ref="phone" name="phone" className="client-text-form" id="client-phone" required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="client-street">Street <span className="required">*</span></label>
                                        <input type="text" ref="street" name="street" className="client-text-form" id="client-street" required />
                                    </div>
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="client-postal-code">Postal Code <span className="required">*</span></label>
                                        <input type="text" ref="postalCode" name="postalCode" className="client-text-form" id="client-postal-code" required />
                                    </div>
                                    <div className="small-12 medium-4 columns">
                                        <label htmlFor="client-city">City <span className="required">*</span></label>
                                        <select ref="city" name="city" className="client-select-form" id="client-city" required>
                                            {this.props.cities.map(city => {
                                                return <option key={city.city_id} value={city.city_id}>{city.city}</option>;
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <p className="required-info">Fields marked with * are required.</p>
                                <input type="submit" name="submit" className="btn" id="client-submit" value="Add Client" />
                            </form>
                        </div>
                        {/* <-- End #client-add -->*/}
                    </div>
                </div>
            </div>
        );
    }
}

Add.propTypes = {
    setHeaderTab: PropTypes.func.isRequired,
    addClient: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired
};

export default Add;
