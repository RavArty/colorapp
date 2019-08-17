import { UserActionTypes } from './user.types';


const INITIAL_STATE = {
  currentUser: null,
  entries: 0
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_ENTRIES:
      return {
        ...state,
        entries: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;