import { injectReducer } from '../../store/reducers';
import { browserHistory } from 'react-router'


export default (store) => ({

  path: 'requisitionList',
  /*  Async getComponent is only invoked when route matches   */
  getComponent(nextState, cb) {
     //fetching token stored in localStorage
     let token = localStorage.getItem('jwtToken');
     if (token) {
      /*  Webpack - use 'require.ensure' to create a split point
      and embed an async module loader (jsonp) when bundling   */
      require.ensure([], (require) => {
        /*  Webpack - use require callback to define
            dependencies for bundling   */
        const Requisition = require('./containers/RequisitionContainer').default
        const reducer = require('./modules/requisition').default

        /*  Add the reducer to the store on key 'counter'  */
        injectReducer(store, { key: 'requisition', reducer })

        /*  Return getComponent   */
        cb(null, Requisition)

        /* Webpack named bundle   */
      }, 'requisition')
    }//if token is not available redirecting to login page
    else
    {
      //redirecting to login page
       window.location.href = window.location.protocol + "/";
      //browserHistory.push('/')
    }
  }
})
