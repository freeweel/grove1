import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const MyDetailTemplate = (props) => {
  let titleDisplay = (props.detail.title) ? 'd-block' : 'd-none';
  let cityDisplay = (props.detail.city) ? 'd-block' : 'd-none';
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
        <dt className={titleDisplay}>Title</dt>
        <dd>{props.detail.title}</dd>
        <dt className={cityDisplay}>City</dt>
        <dd>{props.detail.city}</dd>
        <dt >Gender</dt>
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