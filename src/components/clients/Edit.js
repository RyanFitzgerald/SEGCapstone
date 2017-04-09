import React, { Component, PropTypes } from 'react';
import * as api from '../../api';
import Loading from '../Loading';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: null
        };
    }

    componentDidMount() {
        // Update page title
        document.title = `Edit Client ${this.props.match.params.clientID}`;

        // Update Active Tab (zero to hide)
        this.props.setHeaderTab(0);

        // Get client
        this.getClient(this.props.match.params.clientID);
    }

    getClient = clientID => {
        api.getClientByID(clientID).then(client => {
            this.setState({
                client
            });
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        let newClient = {
            clientID: this.refs.clientID.value,
            clientName: this.refs.name.value,
            email: this.refs.email.value,
            telephone: this.refs.phone.value,
            street: this.refs.street.value,
            postalCode: this.refs.postalCode.value,
            cityID: this.refs.city.value
        };
        this.props.editClient(newClient);
    };

    handlePhone = e => {
        e.target.value = e.target.value.replace(/^(\d{3})(\d{3})(\d)+$/, '($1) $2-$3');
    };

    currentContent() {
        if (this.state.client) {
            return (
                <div id="dashboard-other">
                    <div className="row">
                        <div className="small-12 columns">
                            <h2>Update Client</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input type="hidden" ref="clientID" name="client_id" value={this.state.client.client_id} />
                                <div id="client-add" className="dashboard-block">
                                    <div className="row">
                                        <div className="small-12 columns">
                                            <label htmlFor="client-first-name">Name <span className="required">*</span></label>
                                            <input type="text" ref="name" name="name" className="client-text-form" id="client-first-name" defaultValue={this.state.client.name} required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="small-12 medium-6 columns">
                                            <label htmlFor="client-email">Email</label>
                                            <input type="email" ref="email" name="email" className="client-text-form" id="client-email" defaultValue={this.state.client.email} />
                                        </div>
                                        <div className="small-12 medium-6 columns">
                                            <label htmlFor="client-phone">Phone Number <span className="required">*</span></label>
                                            <input type="text" ref="phone" name="phone" className="client-text-form" id="client-phone" maxLength="14" onKeyUp={this.handlePhone} defaultValue={this.state.client.telephone} required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="small-12 medium-4 columns">
                                            <label htmlFor="client-street">Street <span className="required">*</span></label>
                                            <input type="text" ref="street" name="street" className="client-text-form" id="client-street" defaultValue={this.state.client.street} required />
                                        </div>
                                        <div className="small-12 medium-4 columns">
                                            <label htmlFor="client-postal-code">Postal Code <span className="required">*</span></label>
                                            <input type="text" ref="postalCode" name="postalCode" className="client-text-form postal-code-field" id="client-postal-code" defaultValue={this.state.client.postal_code} maxLength="6" required />
                                        </div>
                                        <div className="small-12 medium-4 columns">
                                            <label htmlFor="client-city">City <span className="required">*</span></label>
                                            <select name="city" ref="city" className="client-select-form" id="client-city" defaultValue={this.state.client.city_id} required>
                                                {this.props.cities.map(city => {
                                                    return <option key={city.city_id} value={city.city_id}>{city.city}</option>;
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <p className="required-info">Fields marked with * are required.</p>
                                    <input type="submit" name="submit" className="btn" id="client-submit" value="Update Client" />
                                </div>
                                {/* <-- End #client-add -->*/}
                            </form>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <Loading />
        );
    }

    render() {
        return (
            <div>
                {this.currentContent()}
            </div>
        );
    }
}

Edit.propTypes = {
    match: PropTypes.any,
    setHeaderTab: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    editClient: PropTypes.func.isRequired
};

export default Edit;
