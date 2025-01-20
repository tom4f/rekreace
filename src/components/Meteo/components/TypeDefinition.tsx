import { ParsedUrlQuery } from 'querystring';
import { EditMeteoType } from './ModifyPocasi';
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

export type dateType = {
  [key in 'daily' | 'yearSum' | 'davisStat' | 'oldStation']: Date;
};

export type reducerActionType = {
  type: string;
  payload: {
    param: string;
    value: Date;
  };
};

export type reduceDateType = (param: string, value: Date) => void;

export type providerType = {
  date: dateType;
  reduceDate: reduceDateType;
};

export type pocasiType = {
  datum: string;
  cas: string;
  hladina: number;
  pritok: number;
  odtok: number;
  voda: number;
  vzduch: number;
  pocasi: string;
};

export type setPocasiType = React.Dispatch<
  React.SetStateAction<pocasiType[] | undefined>
>;

export type rgbCssType = (
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

export type setEditMeteoType = React.Dispatch<
  React.SetStateAction<EditMeteoType>
>;

export type ModifyPocasiType = {
  editMeteo: EditMeteoType;
  setEditMeteo: setEditMeteoType;
  webToken: string;
  user: string;
};

export type AddPocasiType = ModifyPocasiType & {
  pocasi: pocasiType[];
};

export type FDobjectType = {
  [key: string]: number | string | File;
};

export type addQuerySelectorType = (
  pocasi: pocasiType[],
  editMeteo: EditMeteoType,
  setEditMeteo: setEditMeteoType
) => void;

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
  setEditMeteo: setEditMeteoType;
};
