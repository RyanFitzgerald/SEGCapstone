import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <p>
              Header Img
            </p>
          </Link>
        </header>
        <div>{this.props.children}</div>
        <footer>
          <p>
            Footer
          </p>
        </footer>
      </div>
    );
  }
}
