import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { MsgBox, Error, YesNo, OkCancel } from './ModalDialogs';

// Save/Cancel buttons and actions (props are supplied via JSX object's attribute values)
const FormSaveButtonContainer = class FormSaveButtonContainer extends Component {
  constructor() {
    super();
    this.state = { showErrorDlg: false, showMsgDlg: false, msg: ""};
  }
  alertMe() { return () => this.showMsgDialog(JSON.stringify(this.props)) };
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

      const opts2 = {
        method: 'PUT',
        body: JSON.stringify(this.props.content),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      };
      try {
        const resp = await fetch(uri, opts);
        if (! resp.ok) throw (resp);
      }
      catch (err) {
        let msg = "An error occurred while saving resource.\nServer returned " + err.status;
        console.log(msg);
        this.showErrorDialog(msg);
      }
    }
  }

  // Show the MsgBox dialog by forcing a state change
  showMsgDialog(msg) {
    this.setState({ showMsgDlg: true, showErrorDlg: false, msg: msg });
  }

  // Show the Error dialog by forcing a state change
  showErrorDialog(msg) {
    this.setState({ showMsgDlg: false, showErrorDlg: true, msg: msg });
  }

  // This is passed on onClose to hide the dialogs from any other state changes in this component
  closeDialogs() { return () => {
    this.setState({ showMsgDlg: false, showErrorDlg: false });
  }}

  render() {
    let detailsUrl = '/detail?id=' + this.props.id;
    return (
      <div>
        <Error onClose={this.closeDialogs()} show={this.state.showErrorDlg} msg={this.state.msg}></Error>
        <MsgBox onClose={this.closeDialogs()} show={this.state.showMsgDlg} msg={this.state.msg}></MsgBox>
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