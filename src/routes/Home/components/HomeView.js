import React,{PropTypes} from 'react';
import './HomeView.scss'
import Login from '../../Login/containers/loginContainer'
import { connect } from 'react-redux';

export class HomeView extends React.Component{
render() {
  return(
  <div className='full-height' >
    {/*(this.props.isUserLoggedIn)?<div/>: <Login/>*/}
      <Login/>
    </div>
    );
  }
}

function mapStateToProps  (state) {
  return{
   isUserLoggedIn: state.login.isUserLoggedIn,
  };
}

export default connect(mapStateToProps)(HomeView);

//export default  HomeView