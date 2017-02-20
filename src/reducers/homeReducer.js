
const initialState = null;
//export default function homeReducer (state = {user:{}}, action) {
  //export default function homeReducer (state , action) {
  export default function homeReducer (state = {user:{}}, action) {
  switch (action.type)
  {
      case 'CREATE_LOGIN':
       return (Object.assign({},state));

        default:
        return state;
  }
}
