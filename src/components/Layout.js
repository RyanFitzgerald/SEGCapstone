import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div>
          <Link to="/">
            <p>
              Header Img
            </p>
          </Link>
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div>
          <p>
            Footer
          </p>
      </div>
    );
  }
}
