import React, { Component, PropTypes } from 'react';

class Search extends Component {

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
                        <h2>Clients (20)</h2>
                        <div className="client-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="client-result-info">
                                        <h3>John & Jane Doe</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Email: </b>jdoe@gmail.com</span>
                                        <span><b>Telephone: </b>613-123-4567</span>
                                    </div>
                                    {/* <!-- End client-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="client-result-actions">
                                        <a className="btn-dark" href="#">View Client</a>
                                        <a className="btn-dark" href="#">Edit Client</a>
                                        <a className="btn-dark" href="#">Delete Client</a>
                                    </div>
                                    {/* <!-- End client-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End client-result --> */}
                        <div className="client-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="client-result-info">
                                        <h3>John & Jane Doe</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Email: </b>jdoe@gmail.com</span>
                                        <span><b>Telephone: </b>613-123-4567</span>
                                    </div>
                                    {/* <!-- End client-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="client-result-actions">
                                        <a className="btn-dark" href="#">View Client</a>
                                        <a className="btn-dark" href="#">Edit Client</a>
                                        <a className="btn-dark" href="#">Delete Client</a>
                                    </div>
                                    {/* <!-- End client-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End client-result --> */}
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
    setHeaderTab: PropTypes.func.isRequired
};

export default Search;
