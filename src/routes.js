import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import PortalPage from './components/PortalPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';

// Routes between react components
const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={PortalPage}/>
    //<Route path="profile/:id" component={ProfilePage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
