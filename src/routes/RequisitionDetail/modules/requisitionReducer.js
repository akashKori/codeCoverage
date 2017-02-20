//load the dependent constant
import {
  RECEIVE_REQUISITION,
  REQUEST_REQUISITION
} from '../../../Constant/actionType'
//define the initail state for the reducer
var initialState={
     requisition: [],
  loadingRequisition: true
}

//call the action to update the sate
 function requisitionReducer(state =initialState, action) {
    switch (action.type) {
  case RECEIVE_REQUISITION:
        return Object.assign({}, state, {
          requisition: action.requisition,
          loadingRequisition: false,
        });
    case REQUEST_REQUISITION:
        return Object.assign({}, state, {
          loadingRequisition: true
       
        });
  
    default:
        return state;
    }
}


export default requisitionReducer;
