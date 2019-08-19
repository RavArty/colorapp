import {createSelector} from 'reselect'

const selectImage = state => state.image

export const selectCurrentImageUrl = createSelector(
  [selectImage],
  image => image.imageUrl
)

export const selectCurrentImageCodes = createSelector(
  [selectImage],
  image => image.imageCodes
)