import { applyMiddleware, compose, createStore } from 'redux'
import initailState  from '../../src/routes/Login/modules/loginReducer'
import * as loginAction from  '../../src/routes/Login/modules/loginAction'
import chai from 'chai'
import sinon from 'sinon'

const user = {username : 'Shuvam@gmail.com' , password : 'Stp@*mnq1', isLoggedIn :false}; 
const invalidUser = {username : 'sds' , password : 'sds', isLoggedIn :false}
const loginStore = createStore( initailState); 
    describe('testing for login Success functionality ', ()=>{
      describe('testing for Positive Scenario', ()=>{
        //crete state with home reduce and intial state of login 
        it('first check if store is an object type' , ()=>{
          chai.expect(typeof(loginStore)).equals('object');
        })
        ///checking for success login
        
        const loginSuccessObj = loginAction.loginSuccess(user);    
        loginStore.dispatch(loginSuccessObj);
        const actualStateSuccess = loginStore.getState();
        const expectedStateSuccess = { 
                                user: user, // passing user object
                                isUserLoggedIn: false
                                }

      //check for login if it called or not
      it('login success return type should be an object', ()=>{

        chai.expect(typeof(loginSuccessObj)).to.be.equal('object');
      })

      //check if return type has isuserlogged in property

      it('check if return object has isUserLoggedin Object', ()=>{
        chai.expect(loginSuccessObj).has.property('isUserLoggedIn');
      })

      //check if return object type value is Login_Success

      it('check if login success return object type property is equal to Login_Success', ()=>{

        chai.expect(loginSuccessObj.type).to.be.equal('LOGIN_SUCCESS');
      })

      it('check store for login success' , ()=>{
        chai.expect(expectedStateSuccess).to.deep.equals(actualStateSuccess)
      })

      describe('testing for negative scenario' , ()=>{
        const loginSuccessInvalid = loginAction.loginSuccess(invalidUser);    
        loginStore.dispatch(loginSuccessInvalid);
        const actualStateSuccess = loginStore.getState();
        const expectedStateSuccess = { 
                                user: user, // passing user object
                                isUserLoggedIn: false
                                    }
      })
    })
  })
  
  describe('testing for Login Fail functionality' , ()=>{
     
     const loginFailObj = loginAction.loginFailure(invalidUser)  
     loginStore.dispatch(loginFailObj);     
     const expectedSateFailed = loginStore.getState();
     const actualStateFailed = {
      user: user, // passing user object
      isUserLoggedIn: false, // setting and  passing isUserLoggedIn as user loged in
     }
    //check for login if it called or not
    it('login failed return type should be an object', ()=>{
      chai.expect(typeof(loginFailObj)).to.be.equal('object');
    })
    
    //check if return object type value is Login_Success

    it('check if login success return object type property is equal to Login_Success', ()=>{

      chai.expect(loginFailObj.type).to.be.equal('LOGIN_FAILURE');
    })
   })
