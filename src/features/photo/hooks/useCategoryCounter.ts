import { fotoGalleryOwner } from 'api/paths';

import { OnePhotoResponse, useGetCategory, useGetPhoto } from './';

export type CategoryObjType = { [key: string]: number };

export const useCategoryCounter = () => {
  const { data: allPhoto } = useGetPhoto({
    fotoGalleryOwner,
  });
  const { data: categoryNames, isSuccess: isCategoryNamesSuccess } =
    useGetCategory({
      fotoGalleryOwner,
    });

  const reducer = (sumPerCat: CategoryObjType, oneEntry: OnePhotoResponse) => ({
    ...sumPerCat,
    [oneEntry.typ]: (sumPerCat[oneEntry.typ] || 0) + 1,
  });

  const categoryCounter: { [key: string]: number } = allPhoto?.length
    ? allPhoto.reduce(reducer, {
        99999: allPhoto.length,
      })
    : {};

  return {
    isCategorySuccess: isCategoryNamesSuccess,
    categoryCounter,
    categoryNames,
  };
};
