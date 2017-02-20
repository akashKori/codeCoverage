import {
  REQUEST_LABRESULT,
  RECEIVE_LABRESULT,
  REQUEST_REPORT,
  RECEIVE_REPORT
} from '../../../Constant/actionType'
import{APIPATH} from '../../../constant/common'//get the api path

//this method is use to call the web api service to get the data for the first time
export  function LoadLabResult (selectedUserId) {

    return (dispatch) => {
    dispatch({
      type: REQUEST_LABRESULT,//defining the name of the action to identify in the reducer
    });
  fetch(APIPATH+'Requisition/GetRequisitionTestInfo?patientVisitId='+selectedUserId)//calling the service
  .then((response) => response.json())
    .then((labresult) => dispatch(receiveLabResult(labresult)));//passing the data to other actions
  }
}
//this method use to pass the data coming for the lab test result to the component
export  function receiveLabResult(labresult) {

  return {
    type:RECEIVE_LABRESULT,//defining the name of the action to identify in the reducer
    labresult:labresult//passing the data to reducer
  };
}

export  function LoadReportData () {
    return (dispatch) => {
    dispatch({
      type: REQUEST_REPORT,//defining the name of the action to identify in the reducer
    });
  
  fetch(APIPATH+'Requisition/GetReportData')//calling the service
  .then((response) => response.json())
    .then((reportPath) => dispatch(receiveReport(reportPath)));//passing the data to other actions
  }
}
//this method use to pass the data coming for the lab test result to the component
export  function receiveReport(reportPath) {
 var leftPos = 450;
window.open(reportPath,"thePop","menubar=1,resizable=1,scrollbars=1,status=1,left="+leftPos+",top=280,width=850,height=600");
  return {
    type:RECEIVE_REPORT,//defining the name of the action to identify in the reducer
    reportPath:reportPath//passing the data to reducer
  };
  
}

