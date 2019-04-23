import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const MyDetailTemplate = (props) => {

  let genderDisplay = (props.detail.gender) ? 'd-block' : 'd-none';
  let cityDisplay = (props.detail.gender) ? 'd-block' : 'd-none';
  let editUrl = "/edit?id=" + props.id;
  return (
    <div className="card padbig">
      <label>Details for {props.label}  </label>
      <span className="pull-right">
        <LinkContainer exact to={editUrl}>
          <button className="btn btn-default btn-raised">Edit</button>
        </LinkContainer>
      </span>
      <dl>
        <dt>Name</dt>
        <dd>{props.detail.name}</dd>
        <dt>Company</dt>
        <dd>{props.detail.company}</dd>
        <dt>Title</dt>
        <dd>{props.detail.title}</dd>
        <dt className={cityDisplay}>City</dt>
        <dd>{props.detail.city}</dd>
        <dt className={genderDisplay}>Gender</dt>
        <dd>{props.detail.gender}</dd>
        <dt>Content Type</dt>
        <dd>{props.contentType}</dd>
        <dt>ID</dt>
        <dd>{decodeURIComponent(props.id)}</dd>
      </dl>
    </div>
  );
};

export default MyDetailTemplate;


/*
      detail: {props.detail}<br/><br/>
      contentType: {props.contentType}<br/><br/>
      label: {props.label}<br/><br/>
      id: {props.id}<br/><br/>
*/