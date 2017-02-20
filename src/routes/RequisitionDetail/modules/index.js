import {combineReducers} from 'redux';
import attachementReducer from './attachementReducer';
import containerReducer from './containerReducer';
import labResultReducer from './labresultReducer';
import requisitionReducer from './requisitionReducer';

/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
 attachement: attachementReducer,
container:containerReducer,
labresult:labResultReducer,
requisition:requisitionReducer
});

export default allReducers