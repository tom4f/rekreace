import { LoginResponse } from 'features/login';
import { PhotoResponse } from 'features/photo';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface PhotoType extends PhotoResponse {
  url?: string | ArrayBuffer | null;
}

export type imgPositionType = {
  smallImgStart: number;
  smallImgsSize: number;
  current: number;
  category: number;
  reload: number;
};

export type SetStateType = React.Dispatch<
  React.SetStateAction<imgPositionType>
>;

export type CategoryObjType = { [key: string]: number };

export type CategoryNamesType = { [key: string]: string };

export type categoryChangeType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export type SmallImagesTypes = {
  eightPhoto: Array<PhotoResponse>;
  imgPosition: imgPositionType;
  bigPhoto: PhotoType;
  setImgPosition: SetStateType;
  arrIndexFromImgId: (clickedId: number) => number;
};

export type FormularType = {
  editPhoto: PhotoType;
  setEditPhoto: Dispatch<SetStateAction<PhotoType>>;
  setImgPosition: SetStateType;
  categoryObj: CategoryObjType;
  loginData: LoginResponse;
};

export type editImage = {
  editPhoto: PhotoType;
  setEditPhoto: Dispatch<SetStateAction<PhotoType>>;
  setImgPosition: SetStateType;
  categoryObj: CategoryObjType;
};

export type imageChangeType = {
  setEditPhoto: React.Dispatch<React.SetStateAction<PhotoType>>;
  imgId?: number;
};

export type BigImageType = {
  imgPosition: imgPositionType;
  setImgPosition: SetStateType;
  bigPhoto: PhotoType;
  categoryObj: CategoryObjType;
  length: number;
};
