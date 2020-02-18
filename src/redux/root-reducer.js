import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './user/user.reducer';
import imageReducer from './image/image.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['image', 'user']
};

const rootReducer = combineReducers({
  user: userReducer,
  image: imageReducer
});

export default persistReducer(persistConfig, rootReducer);
