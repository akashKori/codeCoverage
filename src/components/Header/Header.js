import React, { PropTypes } from 'react'
import './Header.scss'
import IconButton from 'material-ui/IconButton'
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app'

// to create Header action
import * as headerAction from '../../modules/headerAction'

// update Header page component work with redux so importing connect function
import { connect } from 'react-redux'

class Header extends React.Component {
  // constructor where assigning the default value for the property, initialize the event
  constructor () {
    super()
    // binding the statement for all functions
    this.createLogout = this.createLogout.bind(this)
  }

  // createLogout is the function it is called on click on logout button
  createLogout () {
    this.props.createLogout(this.props.user)
  }
  render () {
    return (

      <div className='header'>
        {/*
      <Link to='/requisition' activeClassName='route--active' className="route--link">
        Requisition Detail
      </Link>
     */ }
        <IconButton tooltip='Logout' onTouchTap={this.createLogout} className='flt-rt' >
          <ActionExitToApp color='#FFF' />
        </IconButton>
        <div className='header__user-name' >{this.props.user.userName} </div>
      </div>
    )
  }
}

Header.PropTypes = {
  isUserLoggedIn: React.PropTypes.bool
}

// this function takes two parameters state & ownProps.
// state is represent state in redux  store
// ownProps let's to access the parameters attached to this component
function mapStateToProps (state, ownProps) {
  // inside the function define a object that return properties like to expose on our component
  return {
    user:state.login.user,
    isUserLoggedIn: state.login.isUserLoggedIn
  }
}

// this function is to deciding g what action to expose on this component
// dispatch is the function that allow to fire of the action
// in mapDispatchToProps function dispatch createLogin action
function mapDispatchToProps (dispatch) {
  return {
    createLogout: logout => dispatch(headerAction.createLogout(logout))
  }
}

// connect function is used to create component that can interact with redux
export default connect(mapStateToProps, mapDispatchToProps)(Header)
