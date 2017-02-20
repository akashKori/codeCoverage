
// this is the file where injecting the loginReducer to root reducer
import { injectReducer } from '../../store/reducers';

export default (store) => (
  {
  path : '',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {

      /*  Webpack - use require callback to define
          dependencies for bundling   */
     const Login = require('./components/Login').default
     const reducer= require('./modules/loginReducer').default

      /*  Add the reducer to the store on key 'user'  */
      injectReducer(store, { key: 'user', reducer })

      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'login')
  }
}
)