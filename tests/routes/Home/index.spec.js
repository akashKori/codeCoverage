import HomeRoute from '../../../src/routes/Home'
import TestUtils from 'react-addons-test-utils';

describe('should check for home component', () => {
  let _component;

  beforeEach(() => {
    _component = HomeRoute;
  })

  it('Should return a route configuration object', () => {
    expect(typeof HomeRoute).to.equal('object')
  
  })
  
})
