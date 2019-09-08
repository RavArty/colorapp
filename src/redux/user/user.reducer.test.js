import * as reducers from './user.reducer'
import { UserActionTypes } from './user.types';

const initialState = {
  currentUser: null,
  entries: 0
}

it('should return initial state', () => {
  expect(reducers.userReducer(undefined, {})).toEqual(
    {
      currentUser: null, 
      entries: 0
    })
})