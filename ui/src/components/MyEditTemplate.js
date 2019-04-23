import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import FormSaveButtonContainer from './FormSaveButtonContainer';

// Contact form component
const EditContactForm = class EditContactForm extends Component {
  constructor(props) {
    super();
    this.state = props.data.detail;
    this.id = props.data.id;
    this.contentType = props.data.contentType;
    //this.handleChange = this.handleChange.bind(this);
  }
  // Using arrow syntax automatically binds 'this' to function
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <div className="card padbig">
        <label>Edit {this.props.data.label}  </label>
        <span className="pull-right">
          <FormSaveButtonContainer id={this.id} contentType={this.contentType} content={this.state}></FormSaveButtonContainer>
        </span>
        <form className="form">
          <label>Name</label>
          <input className="form-control" type="text" name="name" value={this.state.name || ''} onChange={this.handleChange}></input>
          <label>Company</label>
          <input className="form-control" type="text" name="company" value={this.state.company || ''} onChange={this.handleChange}></input>
          <label>Title</label>
          <input className="form-control" type="text" name="title" value={this.state.title || ''} onChange={this.handleChange}></input>
          <label>City</label>
          <input className="form-control" type="text" name="city" value={this.state.city || ''} onChange={this.handleChange}></input>
          <label>Gender</label>
          <input className="form-control" type="text" name="gender" value={this.state.gender || ''} onChange={this.handleChange}></input>
          <label>Content Type</label>
          <input className="form-control" type="text" value={this.contentType || ''} readOnly></input>
          <label>ID</label>
          <input readOnly className="form-control" type="text" value={this.id || ''}></input>
        </form>
      </div>
    );
  }
};

const MyEditTemplate = (props) => {
  return (
    <EditContactForm data={props}></EditContactForm>
  );
};

export default MyEditTemplate;