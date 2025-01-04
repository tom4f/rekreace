import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface allPhotoType {
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

export interface photoType extends allPhotoType {
  url?: string | ArrayBuffer | null;
}

export type imgPositionType = {
  smallImgStart: number;
  smallImgsSize: number;
  current: number;
  category: number;
  reload: number;
};

export type setStateType = React.Dispatch<
  React.SetStateAction<imgPositionType>
>;

export type categoryObjType = { [key: string]: number };

export type CategoryNameType = { [key: string]: string };

export type ChangeType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export type categoryChangeType =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | ChangeEvent<HTMLSelectElement>;

export type SmallImagesTypes = {
  eightPhoto: Array<allPhotoType>;
  imgPosition: imgPositionType;
  bigPhoto: photoType;
  setImgPosition: setStateType;
  arrIndexFromImgId: (clickedId: number) => number;
};

export type AlertType = {
  header: string;
  text: string;
  color?: string;
};

export type EditLogicType = (
  event: React.MouseEvent<HTMLInputElement>
) => Promise<void>;

export type FormularType = {
  editPhoto: photoType;
  setEditPhoto: Dispatch<SetStateAction<photoType>>;
  setImgPosition: setStateType;
  categoryObj: categoryObjType;
  loginData: any;
};

export type editCategoryLogicType = (
  event: React.MouseEvent<HTMLInputElement>
) => Promise<void>;

export type addCategoryLogicType = (
  event: React.MouseEvent<HTMLInputElement>
) => Promise<void>;

export type EditCategoryType = {
  categoryObj: categoryObjType;
  setImgPosition: setStateType;
  editCategory: (event: React.MouseEvent<HTMLInputElement>) => void;
  categoryName: { [key: string]: string } | null;
};

export type editImage = {
  editPhoto: photoType;
  setEditPhoto: Dispatch<SetStateAction<photoType>>;
  setImgPosition: setStateType;
  categoryObj: categoryObjType;
};

export type imageChangeType = {
  setEditPhoto: React.Dispatch<React.SetStateAction<photoType>>;
  imgId?: string;
};

export type BigImageType = {
  imgPosition: imgPositionType;
  setImgPosition: setStateType;
  bigPhoto: photoType;
  categoryObj: categoryObjType;
  length: number;
};

export type LoginLogicType = (
  event: React.FormEvent<HTMLFormElement>,
  formCurrent: HTMLFormElement | null,
  setAlert: React.Dispatch<React.SetStateAction<AlertType>>
) => void;
