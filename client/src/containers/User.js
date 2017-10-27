
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as api from '../api';

// Import client components
import Submenu from '../components/users/Submenu';
import Add from '../components/users/Add';
//import Edit from '../components/users/Edit';
import Directory from '../components/users/Directory';
//import View from '../components/clients/View';
//import Note from '../components/clients/Note';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



class User extends React.Component {
    constructor() {
      super();
  
			// Bind functions
			this.setActiveSubtab = this.setActiveSubtab.bind(this);
      this.getUsers = this.getUsers.bind(this);
			this.addToUsers = this.addToUsers.bind(this);
			this.renderError = this.renderError.bind(this);
      
      // State
      this.state = {
        activeSubtab: 1,
        users: null
      };
    }
  
    componentDidMount() {
      // Set Page Title
      document.title = 'Users Overview | Renovaction';
  
      // Update tab
      this.props.setActiveTab(4);
  
      // Get users
      this.getUsers();
    }
  
    setActiveSubtab(tab) {
      this.setState({activeSubtab: tab});
    }
  
    getUsers(query) {
      api.getUsers(query).then(result => {
        const users = result;
        this.setState({ users });
      });
    }
  
    addToUsers(user) {
			const users = [...this.state.users];
			users[this.state.users.length] = user;
			this.setState({ users });
    }

    addNotification(message, type) {
      toast(message, { type });
    }
  
    renderError(formError) {
      if (!formError) return;
      return (
        <div className="flash flash--warn">
          <p>{formError}</p>
        </div>
      );
    }
  
    render() {
      return (
        <div>
          <ToastContainer 
            position="top-right"
            type="success"
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <Submenu activeSubtab={this.state.activeSubtab} />
  
          <Switch>
            <Route exact path="/users" render={() =>
              <Directory setActiveSubtab={this.setActiveSubtab} users={this.state.users} getUsers={this.getUsers}/>
            }/>
            <Route path="/users/add" render={() =>
              <Add setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} addToUsers={this.addToUsers}/>
            }/>
            {/* <Route path="/clients/:id/note" render={(location) =>
              <Note setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} location={location} />
            }/>
            <Route path="/clients/:id/edit" render={(location) =>
              <Edit setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} renderError={this.renderError} location={location} updateClients={this.updateClients}/>
            }/>
            <Route path="/clients/:id" render={(location) =>
              <View setActiveSubtab={this.setActiveSubtab} addNotification={this.addNotification} location={location} removeFromClients={this.removeFromClients}/>
            }/> */}
          </Switch>
        </div>
      );
    }
  }

  export default User;