//import the required constant
import {
  RECEIVE_ATTACHEMENT,
  REQUEST_ATTACHEMENT
} from '../../../Constant/actionType'
//difine the initail state for the reducer
var initialState={
    attachement: [],
  loadingAttachement: true
}

 function attachementReducer(state = initialState, action) {
    switch (action.type) {
  case RECEIVE_ATTACHEMENT:
        return Object.assign({}, state, {
          attachement: action.attachement,
          loadingAttachement: false,
        });
    case REQUEST_ATTACHEMENT:
        return Object.assign({}, state, {
          loadingAttachement: true
       
        });
  
    default:
        return state;
    }
}


export default attachementReducer;
