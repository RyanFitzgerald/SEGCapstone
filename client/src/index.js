import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill';

// Import libraries
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

ReactDOM.render(
  <Router>
    <App/>
  </Router>, 
  document.getElementById('root')
);
registerServiceWorker();
