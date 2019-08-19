import { ImageActionTypes } from './image.types';


const INITIAL_STATE = {
  imageUrl: '',
  imageCodes: []
};

const imageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ImageActionTypes.SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload
      };
      case ImageActionTypes.SET_IMAGE_CODES:
      return {
        ...state,
        imageCodes: action.payload
      };
    default:
      return state;
  }
};

export default imageReducer;