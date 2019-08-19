import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import imageReducer from './image/image.reducer';

export default combineReducers({
  user: userReducer,
  image: imageReducer,
});