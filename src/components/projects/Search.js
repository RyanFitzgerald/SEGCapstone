import React, { Component, PropTypes } from 'react';

class Search extends Component {

    componentDidMount() {
        // Update page title
        document.title = 'Search Projects';

        // Update Active Tab
        this.props.setHeaderTab(2);
    }

    render() {
        return (
            <div id="dashboard-other">
                <div className="row">
                    <div className="small-12 columns">
                        <h2>Filter Results</h2>
                        <div id="project-filter" className="dashboard-block">
                            <div className="row">
                                <div className="small-12 large-6 columns">
                                    <div id="project-search">
                                        <button><i className="fa fa-search" aria-hidden="true"></i></button>
                                        <input type="text" name="searchProject" placeholder="Search for projects" />
                                    </div>
                                    {/* <!-- End project-search --> */}
                                </div>
                                <div className="small-12 large-6 columns">
                                    <div id="project-refine">
                                        <div className="project-refine-result">
                                            <select>
                                                <option>
                                                    All Locations
                                                </option>
                                            </select>
                                        </div>
                                        {/* <!-- End refine-result --> */}
                                        <div className="project-refine-result">
                                            <select>
                                                <option>
                                                    All Types
                                                </option>
                                            </select>
                                        </div>
                                        {/* <!-- End refine-result --> */}
                                        <div className="project-refine-result">
                                            <select>
                                                <option>
                                                    All Statuses
                                                </option>
                                            </select>
                                        </div>
                                        {/* <!-- End refine-result --> */}
                                    </div>
                                    {/* <!-- End project-refine --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End dashboard-overview --> */}
                    </div>
                </div>
                <div className="row">
                    <div className="small-12 large-8 columns">
                        <h2>Projects (20)</h2>
                        <div className="project-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="project-result-info">
                                        <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Type: </b>Siding, Roofing</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                        </p>

                                    </div>
                                    {/* <!-- End project-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="project-result-actions">
                                        <a className="btn-dark" href="#">View Project</a>
                                        <a className="btn-dark" href="#">Edit Project</a>
                                        <a className="btn-dark" href="#">Delete Project</a>
                                    </div>
                                    {/* <!-- End project-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End project-result --> */}
                        <div className="project-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="project-result-info">
                                        <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Type: </b>Siding, Roofing</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                        </p>

                                    </div>
                                    {/* <!-- End project-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="project-result-actions">
                                        <a className="btn-dark" href="#">View Project</a>
                                        <a className="btn-dark" href="#">Edit Project</a>
                                        <a className="btn-dark" href="#">Delete Project</a>
                                    </div>
                                    {/* <!-- End project-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End project-result --> */}
                        <div className="project-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="project-result-info">
                                        <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Type: </b>Siding, Roofing</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                        </p>

                                    </div>
                                    {/* <!-- End project-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="project-result-actions">
                                        <a className="btn-dark" href="#">View Project</a>
                                        <a className="btn-dark" href="#">Edit Project</a>
                                        <a className="btn-dark" href="#">Delete Project</a>
                                    </div>
                                    {/* <!-- End project-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End project-result --> */}
                        <div className="project-result dashboard-block">
                            <div className="row">
                                <div className="small-12 large-9 columns">
                                    <div className="project-result-info">
                                        <h3><span className="project-result-status complete">Complete</span> Doe Family Project</h3>
                                        <span><b>Location: </b>Ottawa, Ontario</span>
                                        <span><b>Type: </b>Siding, Roofing</span>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a cursus augue. Sed a euismod lorem. Pellentesque posuere molestie nisi vitae viverra.
                                        </p>

                                    </div>
                                    {/* <!-- End project-result-info --> */}
                                </div>
                                <div className="small-12 large-3 columns">
                                    <div className="project-result-actions">
                                        <a className="btn-dark" href="#">View Project</a>
                                        <a className="btn-dark" href="#">Edit Project</a>
                                        <a className="btn-dark" href="#">Delete Project</a>
                                    </div>
                                    {/* <!-- End project-result-actions --> */}
                                </div>
                            </div>
                        </div>
                        {/* <!-- End project-result --> */}
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
