import { injectReducer } from '../../store/reducers'
import {getVisitDetails} from '.././Requisition/modules/requisition'
export default (store) => ({
   path : 'requisition',
  /*  Async getComponent is only invoked when route matches   */
   getComponent (nextState, cb) {
  var visitId=sessionStorage.getItem('visitId')//get the visitId selected from the each row of list
  var tabHeader=sessionStorage.getItem('tabHeader')//get browser tab header
  store.dispatch(getVisitDetails(visitId));//get pateintInfo
  window.onload=function() { this.document.title =tabHeader }
        /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
     const req = require('./components/Requisition/RequisitionDetail').default//get the component
     const reducer= require('./modules').default//get all the reducers defined for the detail page.
        /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'reqDetail', reducer })//inject the reducer
      /*  Return getComponent   */
      cb(null, req)//load the component dynamically
    /* Webpack named bundle   */
    }, 'reqDetail')
  }
}
)