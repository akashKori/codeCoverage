import React from 'react'
import Login from '../../../../src/routes/Login/components/Login'
import chai from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai)
chai.should()
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as loginAction from '../../../../src/routes/Login/modules/loginAction'
import * as requisition from '../../../../src/routes/Requisition/modules/requisition'

// //shallow rendering with Enzyme (same operation we can do with test utils)
function shallowRendering()
{
 let output = mount(<Login/>,
 {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired
    }
 });

return { output };
}
///Testing login component
describe('Testing Login component', () => {
let output = shallow(<Login/>,
 {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired
    }
 });

/*===================component level testing (Unit test) ====================*/ 
 it('should return login component as division',()=>
 { 
    chai.expect(output.find('div').length).to.be.equals(6);
 });

//testing first child of your component
 it('h4 should return text as login',()=>{
    chai.expect(output.find('h4').text()).to.be.equals('Login');
 });

 it('TextField control which has txtname should return hint text as User name',()=>{
    chai.expect(output.find({name : 'txtName'}).props().hintText).to.be.equals('User Name');
 });

 it('check Raised Button content', ()=>{
   chai.expect(output.find({name:'Login_button'}).props().label).to.be.equals('Login');
 })

})

