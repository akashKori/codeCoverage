import {
  RECEIVE_CONTAINER,
  REQUEST_CONTAINER
} from '../../../Constant/actionType'

//define the initail state for the reducer
var initialState={
     container: [],
  loadingContainer: true
}
//call the action to update the sate
 function containerReducer(state = initialState, action) {
    switch (action.type) {
  case RECEIVE_CONTAINER:
        return Object.assign({}, state, {
          container: action.container,
          loadingContainer: false,
        });
    case REQUEST_CONTAINER:
        return Object.assign({}, state, {
          loadingContainer: true
       
        });
  
    default:
        return state;
    }
}


export default containerReducer;
