import { fotoGalleryOwner } from 'api/paths';
import { useEffect } from 'react';
import { usePhotoGalleryStore } from 'src/store';

import { useGetPhoto } from './useGetPhoto';

export const usePhoto = () => {
  const { data: allPhoto } = useGetPhoto({ fotoGalleryOwner });
  const {
    filteredPhoto,
    arrIndexFromImgId,
    bigPhoto,
    eightPhoto,
    updatePhotos,
    imgPosition,
  } = usePhotoGalleryStore();

  useEffect(() => {
    if (allPhoto) {
      updatePhotos(allPhoto);
    }
  }, [allPhoto, updatePhotos, imgPosition]);

  return {
    filteredPhoto,
    arrIndexFromImgId,
    bigPhoto,
    eightPhoto,
  };
};
