import {
  REQUEST_REQUISITION,
  RECEIVE_REQUISITION
} from '../../../Constant/actionType'
import{APIPATH} from '../../../constant/common'//get the api path
//this method is use to call the web api service to get the data for the first time
export  function LoadRequistion(selectedUserId) {
    return (dispatch) => {
    dispatch({
      type: REQUEST_REQUISITION,//defining the name of the action to identify in the reducer
    });
  
     fetch(APIPATH+'Requisition/GetRequisitionVisitInfo')//calling the service
  .then((response) => response.json())
    .then((requisition) => dispatch(receiverRequistion(requisition)));//passing the data to other actions
  }
}
//this method use to pass the data coming for the lab test result to the component
export  function receiverRequistion(requisition) {

  return {
    type:RECEIVE_REQUISITION,//defining the name of the action to identify in the reducer
    requisition:requisition//passing the data to reducer
  };
}

