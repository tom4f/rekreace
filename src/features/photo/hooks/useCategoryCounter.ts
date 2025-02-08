import { fotoGalleryOwner } from 'api/paths';

import { OnePhotoResponse, useGetCategory, useGetPhoto } from './';

export type CategoryObjType = { [key: string]: number };

export const useCategoryCounter = () => {
  const { data: photos, isSuccess: isGetPhotoSuccess } = useGetPhoto({
    fotoGalleryOwner,
  });
  const { data: categoryNames, isSuccess: isGetCategorySuccess } =
    useGetCategory({
      fotoGalleryOwner,
    });

  const photoReducer = (
    sumPerCat: CategoryObjType,
    oneEntry: OnePhotoResponse
  ) => ({
    ...sumPerCat,
    [oneEntry.typ]: (sumPerCat[oneEntry.typ] || 0) + 1,
  });

  const categoryCounter: { [key: string]: number } = photos?.length
    ? photos.reduce(photoReducer, {
        99999: photos.length,
      })
    : {};

  return {
    isGetCategorySuccess,
    isGetPhotoSuccess,
    categoryCounter,
    categoryNames,
  };
};
