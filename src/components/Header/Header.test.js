import React from 'react';
import { shallow } from 'enzyme';
import { Header }  from './Header';

describe('Header component', () => {
  let wrapper
  let mockSignOut

  beforeEach(() => {
    mockSignOut = jest.fn()

    const mockProps = {
      classes: {signUpButton: "Header-signUpButton-1"},
      currentUser: { uid: '123'}
    }

    wrapper = shallow(<Header {...mockProps}/>)
  })

  describe('if currentUser is present', () => {
    it('Render Sign Out link', () => {
    //  expect(wrapper.find('div').at(0).text()).toBe('SIGN OUT')
      expect(wrapper.find('.btn-signOut').text()).toBe('SIGN OUT')
    })
  })

  describe('if current user is null', () => {
    it('should render SignIn & SignUp', () => {
      const mockProps = {
        classes: {signUpButton: "Header-signUpButton-1"},
        currentUser: null
      }

      const newWrapper = shallow(<Header {...mockProps} />);

      expect(newWrapper.find('div').at(0).text()).toBe('Sign Up')
      expect(newWrapper.find('div').at(1).text()).toBe('Sign in')
    })
  })
})