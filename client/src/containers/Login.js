import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as api from '../api';

// Import client components
import View from '../components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class Login extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.addNotification = this.addNotification.bind(this);
    this.renderError = this.renderError.bind(this);
    this.failedLogin = this.failedLogin.bind(this);

    // State
    this.state = {
      failedLogin: false
    };
  }

  componentDidMount() {
    // Set Page Title
    document.title = 'Login | Renovaction';
  }

  failedLogin(bool) {
    this.setState({failedLogin: bool});
    console.log(this.state.failedLogin);
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
        <Switch>
          <Route path="/login" render={() =>
            <View addNotification = {this.addNotification} failedLogin = {this.failedLogin}/>
          }/>
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  }
}

export default Login;