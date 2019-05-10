import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { ModalDlg, MsgBox, YesNo, Error } from './ModalDialogs';

// Save/Cancel buttons and actions (props are supplied via JSX object's attribute values)
const FormSaveButtonContainer = class FormSaveButtonContainer extends Component {
  constructor() {
    super();
    this.state = { showErrorDlg: false, showMsgDlg: false, msg: "", submitted: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
        this.showErrorDlg(msg);
      }
    }
  }

  handleSubmit() {
    this.setState({ submitted: true });
  }

  showMsgBox(msg) {
    this.setState({ msgMsgBox: msg, showMsgBox: true});
  }

  // Show the Error dialog by forcing a state change
  showErrorDlg(msg) {
    this.setState({ msgError: msg,showError: true});
  }

    // Small test function to show a Yes/No dialog
  showYesNoDlg(msg, yesClickFx) { 
    this.setState({ msgYesNo: msg, showYesNo: true, yesClick: yesClickFx });
  };

  render() {
    let detailsUrl = '/detail?id=' + this.props.id;
    if (this.state.submitted) {
      return <Redirect to={detailsUrl + '&reload=true'}/>
    }
    return (
      <div>
        <Error msg={this.state.msgError} show={this.state.showError} onClose={() => this.setState({showError: false}) }/>
        <MsgBox msg={this.state.msgMsgBox} show={this.state.showMsgBox} onClose={() => this.setState({showMsgBox: false})}/>
        <YesNo msg={this.state.msgYesNo} show={this.state.showYesNo} onClose={() => this.setState({showYesNo: false})} yes={this.state.yesClick}/>
        <LinkContainer exact to={detailsUrl}>
          <button className="btn btn-warning btn-raised">Cancel</button>
        </LinkContainer>
        &#160;
        <button className="btn btn-default btn-raised" onClick={this.save()}>Save</button>
        &#160;
        <button className="btn btn-primary btn-raised" onClick={()=>this.showMsgBox('You pressed the test button')}>Test</button>
        &#160;
        <button className="btn btn-primary btn-raised" onClick={()=>this.showYesNoDlg('Do you have a question?',() => this.showMsgBox('The answer is 42') )}>?</button>
      </div>
    )
  }
};

export default FormSaveButtonContainer;