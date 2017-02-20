import Login from '../../../src/routes/Login/components/Login'
import chai from 'chai'

describe('testing componenet by route configuration object', () => {
  let _component

  beforeEach(() => {
    _component = Login;
  })

  it('Should return a route configuration object', () => { 
   chai.assert(typeof(Login)).to.be.equals('object');
  });  
});
