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
      redirect: null,
      formError: false
    };
  }

  componentDidMount() {
    // Update tab
    this.props.setActiveSubtab(0);

    // Set title
    document.title = 'Add Note | Renovaction';
  }

  componentWillMount() {
    if (!this.props.checkLevel(JSON.parse(sessionStorage.getItem('user')).role.level, 2)) {
      this.setState({
        redirect: {
          location: '/clients/',
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
    const note = {
      description: this.description.value,
      client: this.props.location.match.params.id
    };

    // Call api
    this.addNote(note);
  }

  addNote(note) {
    api.addClientNote(note).then(resp => {
      if (resp.status === 500) {
        this.setState({
          formError: 'There was an error when submitting the form, please try again.'
        })
        return;
      }

      this.setState({
        redirect: {
          location: `/clients/${this.props.location.match.params.id}`,
          message: 'Successfully added note!',
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
        <Redirect to={this.state.redirect.location}/>
      );
    }
    
    if (id && name) {
      return (
        <div className="content">
          <div className="row">
            <div className="column">
              <h2 className="card-title">Add Note For <b>{name}</b></h2>
              <div className="card">
                {this.props.renderError(this.state.formError)}
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
                      <textarea ref={input => this.description = input} name="description" className="form-textarea" required></textarea>
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