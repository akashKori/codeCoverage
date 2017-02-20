import homeReducer from '../../../../src/reducers/homeReducer'
import * as loginAction from  '../../../../src/routes/Login/modules/loginAction'
import chai from 'chai'
import sinon from 'sinon'
import  { APIPATH } from '../../../../src/constant/common'

/*==================first declare global varible for this file =====================================*/
const user = {username : 'Shuvam@gmail.com' , password : 'Stp@*mnq1', isLoggedIn :false}; 
const invalidUser = {username : 'sds' , password : 'sds', isLoggedIn :false}
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
var logOut = {
  createLogOut : function(user)
  {
    loginAction.createLogout(user);
  }
}

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
it('should call create logout for successfull log out', function(){

  var logOutSpy = sinon.spy(logOut, 'createLogOut');
  loginAction.createLogout(user);
  sinon.assert.calledOnce(logOutSpy);
  logOutSpy.restore();
})
})


//=============checking for reducer ====================//

describe('checking for login reducer is pure function', ()=>{

  it('testing login reducer is pure function or not' , ()=>{
    chai.expect(typeof(initailState)).to.be.equals('function');
  })

  it('testing home reducer is pure function or not' , ()=>{
    chai.expect(typeof(homeReducer)).to.be.equals('function');
  })

    
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
   chai.expect(APIPATH+ 'Account/Login?').to.be.equal(server.responses[0].url);
    server.respond();
    done();
  });
});
});

