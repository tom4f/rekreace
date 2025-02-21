import { EditMeteoType } from './Lipno';

export type RgbCssType = (
  r: number,
  g: number,
  b: number,
  value: number
) => {
  background: string;
};

export type SetEditMeteoType = React.Dispatch<
  React.SetStateAction<EditMeteoType>
>;
