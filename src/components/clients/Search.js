import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router-dom';

class Search extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Update page title
        document.title = 'Search Clients';

        // Update Active Tab
        this.props.setHeaderTab(2);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Filter Results</h2>
                        <div id="client-filter" className="dashboard-block">
                            <div className="row">
                                <div className="small-12 large-8 columns">
                                    <div id="client-search">
                                        <button><i className="fa fa-search" aria-hidden="true"></i></button>
                                        <input type="text" name="searchClient" placeholder="Search for clients" />
                                    </div>
                                    {/* <!-- End project-search --> */}
                                </div>
                                <div className="small-12 large-4 columns">
                                    <div id="client-refine">
                                        <div className="client-refine-result">
                                            <select>
                                                <option>
                                                    All Locations
                                                </option>
                                            </select>
                                        </div>
                                        {/* <!-- End refine-result --> */}
                                    </div>
                                    {/* <!-- End client-refine --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End dashboard-overview --> */}
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 large-8 columns">
                        <h2>Clients ({this.props.clients.length})</h2>
                        {this.props.clients.map(client => {
                            return (
                                <div key={client.client_id} className="client-result dashboard-block">
                                    <div className="row">
                                        <div className="small-12 large-9 columns">
                                            <div className="client-result-info">
                                                <h3>{client.name}</h3>
                                                <span><b>Location: </b>{client.city}, Ontario</span>
                                                <span><b>Email: </b>{client.email}</span>
                                                <span><b>Telephone: </b>{client.telephone}</span>
                                            </div>
                                            {/* <!-- End client-result-info --> */}
                                        </div>
                                        <div className="small-12 large-3 columns">
                                            <div className="client-result-actions">
                                                <Link className="btn-dark" to={`/clients/${client.client_id}`}>View Client</Link>
                                                <Link className="btn-dark" to={`/clients/${client.client_id}/edit`}>Edit Client</Link>
                                            </div>
                                            {/* <!-- End client-result-actions --> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="small-12 large-4 columns">
                        <div className="search-tips dashboard-block">
                            <h3>Did You Know?</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra. Etiam volutpat elit vel elit semper porttitor. Nam non eros nunc. Phasellus hendrerit felis tortor, at aliquet est scelerisque in. Aenean eget nibh a lacus iaculis tempor non ut magna.
                            </p>
                            <a href="#">Learn More</a>
                        </div>
                        {/* <!-- End search-tips --> */}
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    setHeaderTab: PropTypes.func.isRequired,
    clients: PropTypes.array.isRequired
};

export default Search;
