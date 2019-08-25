import React from 'react';
import { shallow, mount } from 'enzyme';
import { App }  from './App';

describe('App component', () => {

  const mockProps = {
    currentUser: { uid: '123'}
  }

  let wrapper = shallow(<App {...mockProps}/>)

  describe('if currentUser is present', () => {
    it('should render to /', () => {
      expect(wrapper.find('Route')).toHaveLength(4)
    })
  })
})