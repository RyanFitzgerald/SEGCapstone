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
      redirect: null
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Product | Renovaction';
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
      this.setState({
        redirect: `/projects/${this.props.location.match.params.id}`
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
      return (
        <Redirect to={this.state.redirect} />
      );
    }
    
    if (id && name) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add Product For <b>{name}</b></h2>
              <div className="card">
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