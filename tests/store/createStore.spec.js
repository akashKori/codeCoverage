import homeReducer from '../../src/reducers/homeReducer'
import { applyMiddleware, compose, createStore } from 'redux'
import initailState  from '../../src/routes/Login/modules/loginReducer'
import * as loginAction from  '../../src/routes/Login/modules/loginAction'
import chai from 'chai'
import sinon from 'sinon'
import  { APIPATH } from '../../src/constant/common'

describe('testing store for login page ', ()=>{
const user = {username : 'Shuvam@gmail.com' , password : 'Stp@*mnq1', isLoggedIn :false}; 
const invalidUser = {username : 'sds' , password : 'sds', isLoggedIn :false}
const loginStore = createStore( initailState); 
var loginSuccess = {
    success : function (user){
      loginAction.loginSuccess(user);
    }
  }
 var Login ={
     createLogin : function(user) { loginAction.createLogin(user) }
  };
 var loginFailed = {
    failed : function (user){
      loginAction.loginFailure(user);
    }
  }
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
 
    //  it('testing for login failed ', ()=>{
    //  chai.expect(expectedSateFailed).to.deep.equal(actualStateFailed)
    //  })
   }) 


/*==================Mock test using sinon and sinon-chai ================*/


//----- check whethere create Login is calling or not ----//
describe('mock test for login page by spy ',()=>{
it('should call create Login once by spy', function() {

 
  
   var createLoginSpy= sinon.spy(Login, 'createLogin');
   Login.createLogin(user);
   sinon.assert.calledOnce(createLoginSpy);
   createLoginSpy.restore();
});

//check for login success for correct user object
it('should call Login Success for current user object', ()=>{

  
  var loginSuccessSpy = sinon.spy(loginSuccess, 'success');
  loginSuccess.success(user);
  sinon.assert.calledOnce(loginSuccessSpy);
  loginSuccessSpy.restore();
})

//check for login fail for incorrect user object 

it('should call once if user object is incorrect', ()=>{

 
  var loginFailedSpy = sinon.spy(loginFailed, 'failed')
  loginFailed.failed(invalidUser);
  sinon.assert.calledOnce(loginFailedSpy);
  loginFailedSpy.restore();
})

//--------- check if create Login is calling for correct object or not --//
it('should pass correct object for login success', function() {  
   
  var loginSuccessSpy = sinon.spy(loginSuccess, 'success');
  loginSuccess.success(user);
  sinon.assert.calledWith(loginSuccessSpy);
  loginSuccessSpy.restore();
});
//----------- check if create login is calling before login success method ---//
it('should call createlogin before login success method' , function(){

    var createLoginSpy= sinon.spy(Login, 'createLogin');
    var loginSuccessSpy = sinon.spy(loginSuccess, 'success');
    loginAction.createLogin(user);
    createLoginSpy.calledBefore(loginSuccessSpy);
    createLoginSpy.restore();
    loginSuccessSpy.restore();``
})

//----------- check if create login is calling before login failure  method -- //
it('should call createlogin before login failure method' , function(){

    var createLoginSpy= sinon.spy(Login, 'createLogin');
    var loginFailedSpy = sinon.spy(loginFailed, 'failed')
    loginAction.createLogin(invalidUser);
    createLoginSpy.calledBefore(loginFailedSpy);
    createLoginSpy.restore();
    loginFailedSpy.restore();
})

//---------------check if create login throws desired error if we pass wrong object ---//

// it('should call login success with correct object only ', ()=>{
  
//   var createLoginSuccess = sinon.stub(loginSuccess, 'success');
//   loginAction.createLogin(user);
//   createLoginSuccess.restore(); 
//   sinon.assert.calledWith(createLoginSuccess, user);
// })


// it('should call login failed with Incorrect object only ', ()=>{
  
//   var createLoginFailed = sinon.stub(loginFailed, 'failed');
//   loginAction.createLogin(invalidUser);
//   createLoginFailed.restore(); 
//   sinon.assert.calledWith(createLoginFailed, invalidUser);
// })


})


//=============checking for reducer ====================//

describe('checking for login reducer is pure function', ()=>{

  it('testing login reducer is pure function or not' , ()=>{
    chai.expect(typeof(initailState)).to.be.equals('function');
  })

  it('testing home reducer is pure function or not' , ()=>{
    chai.expect(typeof(homeReducer)).to.be.equals('function');
  })

  // it('Should return if no state is undefined and there is not action.', () => {
  //     let state = initailState(undefined, {})
  //     expect(state).to.equal({user : {}, isUserLoggedIn :false})      
  //   })

  // it('should return if state is there but action is undefined or incorrect', ()=>{
  //    let state = initailState({}, { type: 'Wrong_Type' })
  //     expect(state).to.equal({})     
     
  // })

  // it('should return state of success if action is Login_success', ()=>{
     
  //    let succcessState = initailState(user, 'LOGIN_SUCCESS');
  //    let expectedSuccState = {
  //      user : user
  //    }
  //    expect(succcessState).to.be.deep.equals(expectedSuccState);     
  // })    
})
describe('checking the absoulute path whether it is correct or not', function () {

  var server = null;

  beforeEach(function () {    
    server = sinon.fakeServer.create();  
  });

  afterEach(function () {
    server.restore();
  });

  describe('responding to a generic request', function () {

    beforeEach(function () {
      var okResponse = [
        200,
        { 'Content-type': 'application/json' },
         {
          type: 'LOGIN_SUCCESS', 
          user: user,
          isUserLoggedIn: user.isLoggedIn 
         }
      ];

      server.respond('GET', APIPATH + 'Account/Login?' , okResponse.toString())
    });

   it('returns correct body', function (done) {
   console.log(server.responses[0]);
   chai.expect(APIPATH+ 'Account/Login?').to.be.equal(server.responses[0].url);
    server.respond();
    done();
  });
});
});

})