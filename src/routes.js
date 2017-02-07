import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import PortalPage from './components/PortalPage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={PortalPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
