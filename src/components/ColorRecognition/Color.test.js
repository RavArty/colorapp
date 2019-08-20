import React from 'react'
import { shallow } from 'enzyme';
import Color from './Color'

it('expect to render Color component', () => {
  expect(shallow(<Color/>)).toMatchSnapshot()
})
