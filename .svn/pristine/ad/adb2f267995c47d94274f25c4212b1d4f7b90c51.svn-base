// this file contains the Component for login page
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
//for react localization
import stringTableCons from '../../../Constant/stringFile';
//for style
import './login.scss'
//for busy indicator
import CircularProgress from 'material-ui/CircularProgress';

//for redirecting
import { browserHistory } from 'react-router';

//this class will render the login componet
export default class Login extends React.Component {
  //constructor where assigning the default value for the property, initialize the event
  constructor(props, context) {
    super(props, context);

    //setting the local state
    //user is the object and userName and password are properties
    this.state = {
      user: { userName: "", password: "", isLogedin: false, failureMessage: "" },
      userError: { usernameError_text: "", passwordError_text: "" },
      failureMessage_text: "", showBusyIndicator: false,
    };

    //binding the statement for all functions   
    this.userNameChange = this.userNameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.createLogin = this.createLogin.bind(this);
  }

  //userNameChange is the function where state is updated every time key is pressed at userName input field
  userNameChange(event) {
    const user = this.state.user;
    user.userName = event.target.value;

    //update the state
    this.setState({ user: user })
  }

  // userNameChange is the function where state is updated every time key is pressed at password input field
  passwordChange(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({ user: user })
  }

  //createLogin is the function it is called on click on login button
  createLogin() {

    //validating the user input
    //var isFormValid = true;
    const user = this.state.user;
    const userError = this.state.userError;
    var isFormValid = true;

    //userError.failureMessage_text = "";

    if (user.userName == "") {
      userError.userNameerror_text = "Username is required";
      isFormValid = false;
    }
    else
      userError.userNameerror_text = "";

    if (user.password == "") {
      userError.passwordError_text = "Password is required";
      isFormValid = false;
    }
    else
      userError.passwordError_text = "";

    //setting the state  
    this.setState({ user: user })
    this.setState({ userError: userError })

    if (isFormValid == true) {
      //showing busy indicator
      this.setState({ showBusyIndicator: true })
      this.props.createLogin(this.state.user);
    } else {
      return false;
    }
  }

  // componentWillReceiveProps function is called whenever state is changed
  componentWillReceiveProps(nextProps) {
    //if any failure message is returned, stop busy indicator and show that message
    if (nextProps.user.user.failureMessage != "") {
      //hiding busy indicator
      this.setState({ showBusyIndicator: false })
      this.setState({ failureMessage_text: nextProps.user.user.failureMessage })
    }
  }

  render() {
    if (this.state.showBusyIndicator == true) {
      return (<div className='busy-indicator'>
        <div className='busy-indicator__spinner'>
          <CircularProgress size={40} thickness={5} />
        </div>
      </div>);
    }
    else {
      return (
        <div className="login">
          <Paper zDepth={2} className="login__paper">
            <h4 className="login__heading">{stringTableCons.Login_Header}</h4>
            <div>
              <div className="error-message">{this.state.failureMessage_text} </div>
            </div>
            <div className="login__content">
              <TextField name="txtName" errorText={this.state.userError.userNameerror_text} hintText={stringTableCons.Login_UserName_TextBox} value={this.state.user.userName} floatingLabelText="User Name" fullWidth={true} onChange={this.userNameChange} />
            </div>
            <div className="login__content">
              <TextField hintText={stringTableCons.Login_Password_PasswordBox} errorText={this.state.userError.passwordError_text} value={this.state.user.password} floatingLabelText="Password" type="password" fullWidth={true} onChange={this.passwordChange} />
            </div>
            <div className="login__btn">
              <RaisedButton name= "Login_button" label={stringTableCons.Login_Login_btn} onTouchTap={this.createLogin} primary={true} fullWidth={true} />
            </div>
          </Paper>
        </div>
      );
    }
  }
}




