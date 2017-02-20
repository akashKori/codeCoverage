// this file contains the container for login page
import React,{PropTypes} from 'react';

//to create login action 
import * as loginAction from  '../modules/loginAction'

//update login page component work with redux so importing connect function
import { connect } from 'react-redux';
import Login from '../components/Login'

//this class will render the login componet from login page
 class LoginDetails extends React.Component {
  render(){
  return(
    <Login {...this.props}/>
    );
  }
}

//----------------------------------------------
//container component
//----------------------------------------------

//this function takes two parameters state & ownProps.
//state is represent state in redux  store
//ownProps let's to access the parameters attached to this component
function mapStateToProps(state, ownProps)
{
  //inside the function define a object that return properties like to expose on our component  
  return {
    user: state.login
  };
}


//this function is to deciding g what action to expose on this component 
//dispatch is the function that allow to fire of the action
// in mapDispatchToProps function dispatch createLogin action
function mapDispatchToProps(dispatch)
{
  return{
    createLogin:login=> dispatch(loginAction.createLogin(login))
  };
}

//connect function is used to create component that can interact with redux
//both parameters are functions
export default connect(mapStateToProps,mapDispatchToProps)(LoginDetails)
