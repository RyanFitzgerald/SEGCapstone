import React from 'react';
import { Redirect } from 'react-router-dom';
import * as api from '../../api';

class Note extends React.Component {
  constructor() {
    super();

    // Bind functions
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addNote = this.addNote.bind(this);

    // Set state
    this.state = {
      redirect: null
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Note | Renovaction';
  }

  handleSubmit(e) {
    // Stop form submission
    e.preventDefault();

    // Get form data
    const note = {
      description: this.description.value,
      client: this.props.location.match.params.id
    };

    // Call api
    this.addNote(note);
  }

  addNote(note) {
    api.addClientNote(note).then(resp => {
      this.setState({
        redirect: `/clients/${this.props.location.match.params.id}`
      });
      // Update parent state
      //this.props.addToClients(client);

      // Redirect
      
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
              <h2 className="card-title">Add Note For <b>{name}</b></h2>
              <div className="card">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="md-4 column form-section__title no-left">
                      <h3>Note</h3>
                      <p>
                        Notes are an easy way to attach additional information to the associated record
                      </p>
                    </div>
                    <div className="md-8 column no-right">
                      <label className="form-label" htmlFor="description">Note Description <span className="form-required">*</span></label>
                      <textarea ref={input => this.description = input} name="description" className="form-textarea"></textarea>
                    </div>
                  </div>
                  <div className="text-center">
                    <input type="submit" className="btn btn--primary btn--large" value="Add Note" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <Redirect to="/clients"/>
    );
  }
}

export default Note;