import { Fragment } from 'react';

import { OneGraph } from './OneGraph';

export const OnePage = ({ graphsDataWithGetDataFn }: OnePageType) => {
  return (
    <>
      {graphsDataWithGetDataFn?.map((graphData, index) => {
        return (
          <Fragment key={index}>
            {graphData.specific?.map((oneSpecific, index1) => (
              <OneGraph
                key={index1}
                graphData={{
                  ...graphData,
                  specific: oneSpecific,
                }}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );
};

export type PureData = {
  [key: string]: number | string;
};

export type SpecificGraphType = {
  sourceField: string;
  color: string;
  style: string;
  width: number;
  header: string;
  group: number;
  lineStyle: number[];
}[];

export type LoadDataFunctionType = (
  startDate?: string,
  endDate?: string,
  index?: number
) => Promise<PureData[]>;

export type CommonDataWithGetDataFnType = {
  index: number;
  dateField: string;
  isAllDownloaded: boolean;
  url: string;
  title: string;
  navName: string;
  data?: PureData[];
  loadDataFunction?: LoadDataFunctionType;
};

export type GraphsDataWithGetDataFn = {
  common: CommonDataWithGetDataFnType;
  specific: SpecificGraphType[];
};

type OnePageType = {
  graphsDataWithGetDataFn: GraphsDataWithGetDataFn[];
};
