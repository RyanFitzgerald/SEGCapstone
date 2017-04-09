import React from 'react';
import {Link} from 'react-router-dom';

const NoMatch = () => (
    <div id="page404">
        <h1>404</h1>
        <h2>It looks like the page you were looking for cannot be found.</h2>
        <Link to="/">Click Here To Go Back</Link>
    </div>
);

export default NoMatch;
