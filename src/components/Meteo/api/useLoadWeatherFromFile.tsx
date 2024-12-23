import {
  LoadDataFromFileFunctionType,
  pureData,
} from '../components/TypeDefinition';
import { useGetDownld02 } from '../../../features/meteo/hooks/useGetTextFile';

export const useLoadWeatherFromFile: LoadDataFromFileFunctionType = (
  graphsConfig
) => {
  const queries = useGetDownld02();
  if (!graphsConfig || graphsConfig.length === 0 || !queries[0].data)
    return {
      graphsData: graphsConfig,
      isFetching: false,
      isSuccess: false,
      isSuccessPercentages: 0,
    };

  const lineToArray = (text: string) => {
    const arr = text.trim().split('\n');
    // remove first 3 lines
    arr.shift();
    arr.shift();
    arr.shift();
    // return empty arr if not valid text file - return (-1) = FALSE
    return !arr[0].search(/..\...\.......:../) ? arr : [];
  };

  let mergedArr: string[] = [];

  queries.forEach((query) => {
    if (!query.data) return;
    mergedArr = [...mergedArr, ...lineToArray(query.data)];
  });

  const dirObj: { [key: string]: number } = {
    '---': 16,
    NNW: 15,
    NW: 14,
    WNW: 13,
    W: 12,
    WSW: 11,
    SW: 10,
    SSW: 9,
    S: 8,
    SSE: 7,
    SE: 6,
    ESE: 5,
    E: 4,
    ENE: 3,
    NE: 2,
    NNE: 1,
    N: 0,
  };

  const arrOfObj = mergedArr.reduce(
    (accumulator: Array<pureData>, line, index) => {
      const arrFromLine = line.trim().split(/ +/g);

      const names = [
        'OrigDate',
        'Time',
        'TempOut',
        'TempHi',
        'TempLow',
        'HumOut',
        'DewPt',
        'WindSpeed',
        'WindDir',
        'WindRun',
        'HiSpeed',
        'HiDir',
        'WindChill',
        'HeatIndex',
        'THWIndex',
        'Bar',
        'Rain',
        'RainRate',
        'HeatDD',
        'CoolDD',
        'TempIn',
        'HumIn',
        'DewIn',
        'HeatIn',
        'EMCIn',
        'AirDensityIn',
        'WindSamp',
        'WindTx',
        'ISSRecept',
        'ArcInt',
      ];

      const objFromLine: { [key: string]: string | number } =
        arrFromLine.reduce((accObj, value, index) => {
          // console.log(names[index], value);
          return {
            ...accObj,
            [names[index]]: value,
          };
        }, {});

      if (!arrFromLine) return accumulator;

      const [OrigDate, Time] = arrFromLine || [];

      // UTC used to disable time offset effect
      const [day, month, year] = OrigDate.split('.');
      const [hour, minute] = Time.split(':');
      const dateString = new Date(
        Date.UTC(2000 + +year, +month - 1, +day, +hour, +minute)
      ).toJSON();
      objFromLine.Date = dateString;
      // Wind dir - degrees from string
      objFromLine.WindDir = 22.5 * dirObj[objFromLine.WindDir];

      // tricky index is from 1
      // skip duplicated entries when merging more text files ( optional? )
      const result =
        index > 0 && objFromLine.Date < accumulator[accumulator.length - 1].Date
          ? accumulator
          : [...accumulator, objFromLine];

      return result;
    },
    []
  );

  if (arrOfObj.length === 0)
    return {
      graphsData: [],
      isFetching: false,
      isSuccess: false,
      isSuccessPercentages: 0,
    };

  const graphsData = [{ ...graphsConfig[0], data: arrOfObj }];

  const isSuccessPercentages = Math.round(
    (queries.reduce((acc, query) => (query.isSuccess ? ++acc : acc), 0) * 100) /
      queries.length
  );

  return {
    graphsData,
    isFetching: queries.some((query) => query.isFetching),
    isSuccess: queries.some((query) => query.isSuccess),
    isSuccessPercentages,
  };
};
