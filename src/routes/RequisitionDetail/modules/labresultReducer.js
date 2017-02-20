import {
  RECEIVE_LABRESULT,
  REQUEST_REQUISITION,
  REQUEST_REPORT,
  RECEIVE_REPORT
} from '../../../Constant/actionType'
//define the initail state for the reducer
var initialState={
     labresult: [],
     reportPath:"",
  loadinglabResult: true,
  loadingReport:true
}
//call the action to update the sate
 function labResultReducer(state =initialState, action) {
    switch (action.type) {
  case RECEIVE_LABRESULT:
        return Object.assign({}, state, {
          labresult: action.labresult,
          loadinglabResult: false,
        });
    case REQUEST_REQUISITION:
        return Object.assign({}, state, {
          loadinglabResult: true
       
        });
    case  RECEIVE_REPORT:
        return Object.assign({}, state, {
          reportPath: action.reportPath,
          loadingReport: false,
        });
    case REQUEST_REPORT:
        return Object.assign({}, state, {
          loadingReport: true
       
        });
  
    default:
        return state;
    }
}


export default labResultReducer;