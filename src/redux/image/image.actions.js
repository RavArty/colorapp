import { ImageActionTypes } from './image.types';

export const setImageUrl = image => ({
  type: ImageActionTypes.SET_IMAGE_URL,
  payload: image
})

export const setImageCodes = codes => ({
  type: ImageActionTypes.SET_IMAGE_CODES,
  payload: codes
})