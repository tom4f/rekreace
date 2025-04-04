import { produce } from 'immer';
import { OnePhotoResponse, UpdatePhotoRequest } from 'src/features/photo';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type ImgPositionType = {
  smallImgStart: number;
  smallImgsSize: number;
  current: number;
  category: number;
  reload: number;
};

const initialImgPosition: ImgPositionType = {
  smallImgStart: 0,
  smallImgsSize: 8,
  current: 0,
  category: 99999,
  reload: 0,
};

export const usePhotoGalleryStore = create<PhotoGalleryStoreType>()(
  devtools(
    (set, get) => ({
      imgPosition: initialImgPosition,
      setImgPosition: (updatedValues: Partial<ImgPositionType>) =>
        set(
          produce((state) => {
            state.imgPosition = { ...state.imgPosition, ...updatedValues };
          })
        ),

      editPhoto: { fotoGalleryOwner: '_ubytovani', rotate: 0 },
      setEditPhoto: (updatedValues: Partial<UpdatePhotoRequest>) =>
        set(
          produce((state) => {
            state.editPhoto = { ...state.editPhoto, ...updatedValues };
          })
        ),

      filteredPhoto: [],
      bigPhoto: null,
      eightPhoto: [],
      arrIndexFromImgId: (clickedImgId: number) => {
        const { filteredPhoto } = get();
        return filteredPhoto.findIndex((img) => +img['id'] === clickedImgId);
      },

      updatePhotos: (allPhoto) =>
        set(
          produce((state) => {
            if (!Array.isArray(allPhoto)) {
              state.filteredPhoto = [];
              state.bigPhoto = null;
              state.eightPhoto = [];
              return;
            }

            const { category, current, smallImgStart, smallImgsSize } =
              state.imgPosition;

            state.filteredPhoto =
              category === 99999
                ? allPhoto
                : allPhoto.filter((one) => +one['typ'] === category);

            state.bigPhoto = state.filteredPhoto[current] ?? null;

            state.eightPhoto = state.filteredPhoto.slice(
              smallImgStart,
              smallImgStart + smallImgsSize
            );
          })
        ),
    }),
    { enabled: process.env.NODE_ENV !== 'production' }
  )
);

export type PhotoGalleryStoreType = {
  imgPosition: ImgPositionType;
  setImgPosition: (updatedValues: Partial<ImgPositionType>) => void;

  editPhoto: UpdatePhotoRequest;
  setEditPhoto: (updatedValues: Partial<UpdatePhotoRequest>) => void;

  filteredPhoto: OnePhotoResponse[];
  arrIndexFromImgId: (clickedImgId: number) => number;
  bigPhoto: OnePhotoResponse | null;
  eightPhoto: OnePhotoResponse[];

  updatePhotos: (allPhoto: OnePhotoResponse[]) => void;
};
