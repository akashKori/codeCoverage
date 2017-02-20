//first import the constant
import {
  RECEIVE_CONTAINER,
  REQUEST_CONTAINER
} from '../../../Constant/actionType'
import{APIPATH} from '../../../constant/common'
//this method is use to call the web api service to get the data for the first time
export  function LoadContainer(selectedUserId) {
    return (dispatch) => {
    dispatch({
      type: REQUEST_CONTAINER,//defining the name of the action to identify in the reducer
    });
 
     fetch(APIPATH+'Requisition/GetVisitContainerInfo?patientVisitId='+selectedUserId)//calling the service
  .then((response) => response.json())
    .then((container) => dispatch(receiverContainer(container)));//passing the data to other actions
  }
}
//this method use to pass the data coming for the lab test result to the component
export  function receiverContainer(container) {

  return {
    type:RECEIVE_CONTAINER,//defining the name of the action to identify in the reducer
    container:container//passing the data to reducer
  };
}
