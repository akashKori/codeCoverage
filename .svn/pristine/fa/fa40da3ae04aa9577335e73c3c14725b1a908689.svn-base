//first import the required constant
import {
  REQUEST_ATTACHEMENT,
  RECEIVE_ATTACHEMENT
} from '../../../Constant/actionType'
import{APIPATH} from '../../../constant/common'
//this method is use to call the web api service to get the data for the first time
export  function LoadAttachement(selectedUserId) {
    return (dispatch) => {
    dispatch({
      type: REQUEST_ATTACHEMENT,//defining the name of the action to identify in the reducer
    });

   
     fetch(APIPATH+'Requisition/GetVisitAttachmentInfo?patientVisitId='+selectedUserId)//calling the service
  .then((response) => response.json())
    .then((attachement) => dispatch(receiverAttachement(attachement)));//passing the data to other actions
  }
}
//this method use to pass the data coming from service for the current Visit Id to the component
export  function receiverAttachement(attachement) {

  return {
    type:RECEIVE_ATTACHEMENT,//defining the name of the action to identify in the reducer
    attachement:attachement//passing the data to reducer
  };
}
