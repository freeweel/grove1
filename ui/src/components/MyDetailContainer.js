/**
 * Overrides the default DetailView Component so that we can force the reloading of content,  
 * then uses Redux connect to create a new instance of a DetailContainer.
 * 
 * Example: <MyDetailView id="MyID" reload="true|false"/>
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions, selectors } from 'grove-crud-redux';
import { bindSelectors } from '../utils/redux-utils';
import { DetailView } from 'grove-core-react-components';

// Map the state to properties
const mapStateToProps = (state, ownProps) => {
  const sel = bindSelectors(selectors, 'documents');
  const detail = sel.documentById(state, ownProps.id);
  return {
    label: detail && detail.name,
    detail: detail,
    error: sel.errorById(state, ownProps.id),
    contentType: sel.contentTypeById(state, ownProps.id)
  };
};

// Add the loadDetail method dispatcher
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadDetail: actions.fetchDoc,
    },
    dispatch
  );

// Extend DetailView so we can force a reload if reload is true
class MyDetailView extends DetailView {
  componentDidMount() {
    super.componentDidMount();
    if (this.props.reload) {
      this.props.loadDetail(this.props.id);
    }
  }
}

// Use redux connect to create envelope class mapped to store
const MyDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyDetailView);

export default MyDetailContainer;