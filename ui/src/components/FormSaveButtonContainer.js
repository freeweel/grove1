import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { MsgBox, Error } from './ModalDialogs';

// Save/Cancel buttons and actions (props are supplied via JSX object's attribute values)
const FormSaveButtonContainer = class FormSaveButtonContainer extends Component {
  constructor() {
    super();
    this.state = { showErrorDlg: false, showMsgDlg: false, msg: "", submitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Small test function to show props as JSON in a modal message box
  alertMe() { return () => this.showMsgDialog(JSON.stringify(this.props)) };

  // Save/update the contents of the properties to the database
  save() {
    return async () => {
      const uri = '/api/crud/all/' + encodeURIComponent(this.props.id);
      const opts = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.props.content),
        credentials: 'same-origin'
      }

      try {
        const resp = await fetch(uri, opts);
        if (resp.ok)
          this.handleSubmit();
        else 
          throw (resp);
      }
      catch (err) {
        let msg = "An error occurred while saving resource.\nServer returned " + err.status;
        console.log(msg);
        this.showErrorDialog(msg);
      }
    }
  }

  handleSubmit() {
    this.setState({ submitted: true });
  }

  // Show the MsgBox dialog by forcing a state change
  showMsgDialog(msg) {
    this.setState({ showMsgDlg: true, showErrorDlg: false, msg: msg });
  }

  // Show the Error dialog by forcing a state change
  showErrorDialog(msg) {
    this.setState({ showMsgDlg: false, showErrorDlg: true, msg: msg });
  }

  // Calling this from the "onClose" event prevents dialogs from popping up during other state changes
  hideDialogs() { return () => {
    this.setState({ showMsgDlg: false, showErrorDlg: false });
  }}

  render() {
    let detailsUrl = '/detail?id=' + this.props.id;
    if (this.state.submitted) {
      return <Redirect to={detailsUrl + '&reload=true'}/>
    }
    return (
      <div>
        <Error onClose={this.hideDialogs()} show={this.state.showErrorDlg} msg={this.state.msg}></Error>
        <MsgBox onClose={this.hideDialogs()} show={this.state.showMsgDlg} msg={this.state.msg}></MsgBox>
        <LinkContainer exact to={detailsUrl}>
          <button className="btn btn-warning btn-raised">Cancel</button>
        </LinkContainer>
        &#160;
        <button className="btn btn-default btn-raised" onClick={this.save()}>Save</button>
        &#160;
        <button className="btn btn-primary btn-raised" onClick={this.alertMe()}>Test</button>
      </div>
    )
  }
};

export default FormSaveButtonContainer;