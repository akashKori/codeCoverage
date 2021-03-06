import { connect } from 'react-redux'
import React from 'react'
/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */
import { searchRequisition, getVisitDetails, requestRequisitionSortBy, requestRequisitionDetailsToExport } from '../modules/requisition';
import Requisition from '../components/Requisition';


/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

class RequisitionListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sortBy: 'VisitSequenceId', sortDir: 'ASC', pageSize: 5, page: 1, totalPages: 0 };
  }
  //While load firt time component will execute this following method..
  componentWillMount() {
    if (!this.props.requisitionList || !this.props.requisitionList.length) {
      this.props.searchRequisition(this.state.sortBy, this.state.sortDir, this.state.page, this.state.pageSize);
    }
  }

  //Here we are going to render the requisition component on UI.
  render() {

    return (
      <Requisition {...this.props} />
    )
  }
}


/** Here 'searchRequisition' action using to trigger when we load first time on table ....
 * here 'getVisitDetails' action using for to trigger when we select particular row on table..
 * here 'updateSortBy' action using for to trigger when click on table column...
 * requestRequisitionDetailsToExport : action using to trigger when ever handleChangeSingle function called 
 * @function requestRequisitionDetailsToExport
*/
const mapDispatchToProps = (dispatch, ownProps) => ({

  searchRequisition: (sortBy, sortDir, page, pageSize) => dispatch(searchRequisition(sortBy, sortDir, page, pageSize)),
  getVisitDetails: (PatientVisitId) => dispatch(getVisitDetails(PatientVisitId)),
  updateSortBy: (sortBy, sortDir, page, pageSize) => dispatch(requestRequisitionSortBy(sortBy, sortDir, page, pageSize)),
  requestRequisitionDetailsToExport: (sortBy, sortDir, page, pageSizeNum) => dispatch(requestRequisitionDetailsToExport(sortBy, sortDir, page, pageSizeNum)),
});

//Here we are going to maintain state requisition list and total count..

function mapStateToProps(state) {

  return {
    requisitionList: state.requisition.requisitionList,
    totalCount: state.requisition.totalCount,
     recordList: state.requisition.recordList
  };

}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(RequisitionListContainer)
