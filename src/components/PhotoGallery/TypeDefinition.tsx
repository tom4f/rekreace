import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { LoginResponse } from 'features/login';

export interface AllPhotoType {
  id: string;
  text: string;
  autor: string;
  email: string;
  typ: string;
  header: string;
  insertDate: string;
  date: string;
  rotate: string;
  imgType: string;
}

export interface PhotoType extends AllPhotoType {
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

export type CategoryNameType = { [key: string]: string };

export type categoryChangeType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export type SmallImagesTypes = {
  eightPhoto: Array<AllPhotoType>;
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
  imgId?: string;
};

export type BigImageType = {
  imgPosition: imgPositionType;
  setImgPosition: SetStateType;
  bigPhoto: PhotoType;
  categoryObj: CategoryObjType;
  length: number;
};
