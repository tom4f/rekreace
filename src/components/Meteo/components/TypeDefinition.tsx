import { ParsedUrlQuery } from 'querystring';

import { EditMeteoType } from './Lipno';
export interface urlQueryType extends ParsedUrlQuery {
  page: string;
}

export type BigStyledLi = {
  isActivePath: boolean;
};

type onePathType = {
  onePath: string;
  navName: string;
  isActivePath: boolean;
};

export type NavType = {
  allPaths: onePathType[];
};

export type CustomNavLinkType = ({
  to,
  header,
}: {
  to: string;
  header: string;
}) => React.JSX.Element;

export type reduceDateType = (param: string, value: Date) => void;

export type RgbCssType = (
  r: number,
  g: number,
  b: number,
  value: number
) => {
  background: string;
};

export type oldPocasiType = {
  wind3: number;
  wind6: number;
  wind9: number;
  wind12: number;
  windmax: number;
  direct: number;

  tempmin: number;
  tempavg: number;
  tempmax: number;

  rain: number;
  rain_rate_max: number;

  date: string;
};

export type SetEditMeteoType = React.Dispatch<
  React.SetStateAction<EditMeteoType>
>;

type setUserType = React.Dispatch<React.SetStateAction<string>>;
type setPasswordType = React.Dispatch<React.SetStateAction<string>>;
type setWebTokenType = React.Dispatch<React.SetStateAction<string>>;

export type ShowLoginType = {
  user: string;
  setUser: setUserType;
  password: string;
  setPassword: setPasswordType;
  setWebToken: setWebTokenType;
  editMeteo: EditMeteoType;
  setEditMeteo: SetEditMeteoType;
};
