import React from 'react';
import { Link } from 'react-router-dom';
import {Marker} from 'google-maps-react';
import Map from '../Map';
import json2csv from 'json2csv';

class Directory extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleAdvanced = this.handleAdvanced.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.renderPagination = this.renderPagination.bind(this);

    this.state = {
			activePage: 1,
      usersPerPage: 10
    };
  }

  componentDidMount() {
    // Set title
    document.title = 'User Directory | Renovaction';

    // Update tab
    this.props.setActiveSubtab(1);
  }

  handleAdvanced(e) {
    e.preventDefault();
    if (this.advanced.classList.contains('active')) {
      this.advanced.classList.remove('active');
    } else {
      this.advanced.classList.add('active');
    }
  }

  handleSearch() {
    const query = {
      name: this.name.value,
      email: this.email.value,
      role: this.role.value
    };
    this.props.getUsers(query);
  }

  handlePagination(page) {
    this.setState({
      activePage: page
    });
  }

  resetForm() {
    this.name.value = '';
    this.email.value = '';
    this.role.value = '';
    this.handleSearch();
  }
  
  sortIcon(order) {
    switch(order) {
      case "asc": return "fa-caret-down";
      case "desc": return "fa-caret-up";
      default: return "";
    }
  }
  
	// TODO Allow user to decide number of items per page by setting usersPerPage
  renderPagination(count) {
    const pages = Math.ceil(count / this.state.usersPerPage);

    if (pages < 2) {
      return;
    }

    let items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li key={i} className={this.state.activePage === i ? 'card__pagination-btn card__pagination-btn--active' : 'card__pagination-btn'} onClick={this.handlePagination.bind(this, i)}>
          {i}
        </li>
      );
    }

    return (
      <div className="card__pagination">
        <ul>
          {items}
        </ul>
      </div>
    );
  }

  render() {
    // Variables
    const users = this.props.users || [];
    const nameSortClass = this.sortIcon(this.props.sort.name);
    const emailSortClass = this.sortIcon(this.props.sort.email);
    const visibleUsers = users.slice(((this.state.activePage - 1) * this.state.usersPerPage), this.state.activePage * this.state.usersPerPage);

    return (
      <div className="content">
        <div className="row">
          <div className="column">
            <h2 className="card-title">Filter Users</h2>
            <div className="card">
              <input ref={input => this.name = input} className="form-text" type="text" placeholder="Enter the user's name" onKeyUp={this.handleSearch}/>
              <button className="advanced__toggle" id="advanced-toggle" onClick={this.handleAdvanced}>Toggle Advanced Search</button>
              <div ref={el => this.advanced = el} id="advanced-fields" className="row card__advanced">
                <div className="md-6 column">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input ref={input => this.email = input} id="email" name="email" className="form-text" type="text" onKeyUp={this.handleSearch}/>
                </div>
                <div className="md-6 column">
                  <label className="form-label" htmlFor="role">Role</label>
                  <span className="form-select">
                    <select ref={input => this.role = input} id="role" name="role" id="role" onChange={this.handleSearch}>
											<option value="">All Roles</option>
                      <option value="Admin">Admin</option>
                      <option value="Salesman">Salesman</option>
                      <option value="SuperAdmin">Super Admin</option>
                    </select>
                  </span>
                </div>
                <button className="advanced__toggle" id="advanced-toggle" onClick={this.resetForm}>Reset Form</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <h2 className="card-title">{users.length} Users(s)</h2>
            <div className="card">
              <table className="card__table">
                <thead className="card__tablehead">
                  <tr>
                    <th onClick={(e) => this.props.sortByKey(users, 'name')}>Name <i className={`fa ${nameSortClass}`}></i></th>
                    <th onClick={(e) => this.props.sortByKey(users, 'email')}>Email <i className={`fa ${emailSortClass}`}></i></th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="card__tablebody">
                  {visibleUsers.map((user, key) => {
                    return (
                      <tr key={key}>
                        <td>{user.name}</td>
                        <td><a href={'mailto:' + user.email}>{user.email}</a></td>
                        <td><Link to={`/users/${user._id}`} className="btn btn--small btn--primary">View User</Link></td>
                      </tr>
                    );
                  })}
                </tbody> 
              </table>
              {this.renderPagination(users.length)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Directory;