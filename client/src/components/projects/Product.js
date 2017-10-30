import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

class Note extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addProduct = this.addProduct.bind(this);

    // Set state
    this.state = {
      redirect: null,
      formError: false
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Product | Renovaction';
  }

  componentWillMount() {
    if (!this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2)) {
      this.setState({
        redirect: {
          location: '/projects/',
          message: 'You do not have access to that.',
          type: 'error'
        }
      });
    }
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const product = {
      name: this.name.value,
      brand: this.brand.value,
      colour: this.colour.value,
      style: this.style.value,
      project: this.props.location.match.params.id
    };

    // Call api
    this.addProduct(product);
  }

  addProduct(product) {
    api.addProduct(product).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.setState({
        redirect: {
          location: `/projects/${this.props.location.match.params.id}`,
          message: 'Successfully added product!',
          type: 'success'
        }
      });      
    });
  }
  
  render() {
    const id = this.props.location.match.params.id;
    let name = false;
    if (this.props.location.location && this.props.location.location.query) {
      name = this.props.location.location.query.name;
    }

    if (this.state.redirect) {
      this.props.addNotification(this.state.redirect.message, this.state.redirect.type);
      return (
        <Redirect to={this.state.redirect.location} />
      );
    }
    
    if (id && name) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add Product For <b>{name}</b></h2>
              <div className="card">
              {this.props.renderError(this.state.formError)}
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Product</h3>
                      <p>
                        Products used for a project show up on it's page and are searchable filters
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="name">Name <span className="form-required">*</span></label>
                      <input name="name" ref={input => this.name = input} className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="brand">Brand <span className="form-required">*</span></label>
                      <input name="brand" ref={input => this.brand = input} className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="colour">Colour <span className="form-required">*</span></label>
                      <input name="colour" ref={input => this.colour = input} className="form-text form-text--full" type="text" required/>
                      <label className="form-label" htmlFor="style">Style <span className="form-required">*</span></label>
                      <input name="style" ref={input => this.style = input} className="form-text form-text--full" type="text" required/>
                    </div>
                  </div>
                  <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Product"/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <Redirect to="/projects"/>
    );
  }
}

export default Note;