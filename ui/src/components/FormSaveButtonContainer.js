import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

// Save/Cancel buttons and actions (props are supplied via JSX object's attribute values)
const FormSaveButtonContainer = class FormSaveButtonContainer extends Component {
  alertMe() { return () => alert(JSON.stringify(this.props)) };
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
        console.log("PUT " + this.props.id + " returned " + resp.status);
        if (!resp.ok) throw (resp);
      }
      catch (err) {
        let msg = "An error occurred while saving resource.\nServer returned " + err.status;
        console.log(msg);
        alert(msg);
      }
    }
  }
  render() {
    let detailsUrl = '/detail?id=' + this.props.id;
    return (
      <div>
        <LinkContainer exact to={detailsUrl}>
          <button className="btn btn-warning btn-raised">Cancel</button>
        </LinkContainer>
        &#160;
      <button className="btn btn-default btn-raised" onClick={this.save()}>Save</button>
        &#160;
      <button className="btn btn-primary btn-raised" onClick={this.alertMe()}>Press</button>
      </div>
    )
  }
};

export default FormSaveButtonContainer;