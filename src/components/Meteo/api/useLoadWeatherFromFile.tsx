import {
  LoadDataFromFileFunctionType,
  pureData,
} from '../components/TypeDefinition';
import { useGetDownld02 } from '../../../features/meteo/hooks/useGetTextFile';

export const useLoadWeatherFromFile: LoadDataFromFileFunctionType = (
  graphsConfig
) => {
  const queries = useGetDownld02();

  const textToArrayAllFiles = queries.reduce<string[]>((acc, query) => {
    if (!query.data) return acc;

    const textToArray = (text: string) => {
      const lines = text.trim().split('\n');
      lines.shift();
      lines.shift();
      lines.shift();
      // return empty array if not valid text file - return (-1) = FALSE
      return !lines[0].search(/..\...\.......:../) ? lines : [];
    };

    return [...acc, ...(query.data && textToArray(query.data))];
  }, []);

  const windDirections: { [key: string]: number } = {
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

  const arrOfObj = textToArrayAllFiles.reduce(
    (accumulator: Array<pureData>, line, index) => {
      const arrFromLine = line.trim().split(/ +/g);

      const meteoProperty = [
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
        arrFromLine.reduce(
          (accObj, value, index) => ({
            ...accObj,
            [meteoProperty[index]]: value,
          }),
          {}
        );

      if (!arrFromLine) return accumulator;

      const [OrigDate, Time] = arrFromLine;

      const [day, month, year] = OrigDate.split('.');
      const [hour, minute] = Time.split(':');
      const isoDate = new Date(
        Date.UTC(2000 + +year, +month - 1, +day, +hour, +minute)
      ).toJSON();
      objFromLine.Date = isoDate;
      objFromLine.WindDir = 22.5 * windDirections[objFromLine.WindDir];

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

  const graphsData = [{ ...graphsConfig[0], data: arrOfObj }];

  const isSuccessPercentage = Math.round(
    (queries.reduce((acc, query) => (query.isSuccess ? ++acc : acc), 0) * 100) /
      queries.length
  );

  return {
    graphsData,
    isFetching: queries.some((query) => query.isFetching),
    isSuccess: queries.some((query) => query.isSuccess),
    isSuccessPercentage,
  };
};
