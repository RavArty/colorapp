import * as actions from './user.actions'
import { UserActionTypes } from './user.types';


it('should set a user', () => {
  const text = 'test'
  const expectedAction = {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: text
  }
  expect(actions.setCurrentUser(text)).toEqual(expectedAction)
})

it('should set entries', () => {
  const text = 'test'
  const expectedAction = {
    type: UserActionTypes.SET_ENTRIES,
    payload: text
  }
  expect(actions.setEntries(text)).toEqual(expectedAction)
})