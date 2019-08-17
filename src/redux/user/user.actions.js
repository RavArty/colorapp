import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})

export const setEntries = entries => ({
  type: UserActionTypes.SET_ENTRIES,
  payload: entries
})