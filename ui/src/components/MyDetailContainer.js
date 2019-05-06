/**
 * Class to add some special features to detail container
 */
import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { DetailContainer } from 'grove-core-react-redux-containers';

// Experimental...
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DetailView } from 'grove-core-react-components';

import { actions, selectors } from 'grove-crud-redux';
import { bindSelectors } from '../utils/redux-utils';


const MyDetailContainer = class MyDetailContainer extends DetailContainer {
  state = {};
  componentDidMount() {
    super.componentDidMount();
    this.reload();
  }

  // Reload properties from the database
  reload() {
    let contentType;
    const uri = '/api/crud/all/' + encodeURIComponent(this.props.id);
    const opts = {
      method: 'GET',
      credentials: 'same-origin'
    }
    fetch(uri, opts)
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => {
        this.setState(response);
        return {
          content: response.content || response,
          contentType: response.contentType || contentType
        };
      });
  }

  // render() {
  //   let editUrl = "/edit?id=" + this.props.id;
  //   return (
  //     <div>
  //       <label>Details for  </label>
  //       <span className="pull-right">
  //         <LinkContainer exact to={editUrl}>
  //           <button className="btn btn-default btn-raised">Edit</button>
  //         </LinkContainer>
  //       </span> <h1>Poop scoop: {this.state.name}</h1>
  //     </div>
  //   )
  // }
}

// const boundSelectors = bindSelectors(selectors, 'documents');

// const mapStateToProps = (state, ownProps) => {
//   const sel = boundSelectors;
//   const detail = sel.documentById(state, ownProps.id);
//   return {
//     // TODO: move this label implementation to a samplePerson branch
//     // because it is not generic, but it is useful for a quick Grove demo
//     label: detail && detail.name,
//     detail: detail,
//     error: sel.errorById(state, ownProps.id),
//     contentType: sel.contentTypeById(state, ownProps.id)
//   };
// };

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       loadDetail: actions.fetchDoc,
//     },
//     dispatch
//   );

// const xxxMyDetailContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DetailView);

export default MyDetailContainer;