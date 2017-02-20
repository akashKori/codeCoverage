import React from 'react'
import { HomeView } from '../../../../src/routes/Home/components/HomeView'
import { render } from 'enzyme'
import TestUtils from 'react-addons-test-utils'
import chai from 'chai'

describe('Testing home component ', () => {
//using shallow rendering metehod to get the partial dom of home component
    it('should return home component as object', ()=> {
        const renderer = TestUtils.createRenderer();
        renderer.render(<HomeView/>);
        const result = renderer.getRenderOutput();

        chai.expect(result.type).to.be.equals('div');
    });
})
