import {
  LoadDataFromFileFunctionType,
  pureData,
} from '../components/TypeDefinition';
import { useGetDownld02 } from '../../../features/meteo/hooks/useGetTextFile';

export const useLoadWeatherFromFile: LoadDataFromFileFunctionType = (
  graphsConfig
) => {
  const queries = useGetDownld02();

  const windDirections: { [key: string]: string } = {
    '---': '16',
    NNW: '15',
    NW: '14',
    WNW: '13',
    W: '12',
    WSW: '11',
    SW: '10',
    SSW: '9',
    S: '8',
    SSE: '7',
    SE: '6',
    ESE: '5',
    E: '4',
    ENE: '3',
    NE: '2',
    NNE: '1',
    N: '0',
  };

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

  const linesToObject = (lines: string[]) => {
    const arrOfObj = lines.reduce((accumulator: Array<pureData>, line) => {
      const oneMinuteArray = line.trim().split(/ +/g);

      const oneMinuteObject: { [key: string]: string } = oneMinuteArray.reduce(
        (meteoDataObject, meteoValue, index) => ({
          ...meteoDataObject,
          [meteoProperty[index]]: meteoValue,
        }),
        {}
      );

      const { OrigDate, Time } = oneMinuteObject;

      const [day, month, year] = OrigDate.split('.');
      const [hour, minute] = Time.split(':');
      const isoDate = new Date(
        Date.UTC(2000 + +year, +month - 1, +day, +hour, +minute)
      ).toJSON();
      oneMinuteObject.Date = isoDate;
      oneMinuteObject.WindDir = (
        22.5 * +windDirections[oneMinuteObject.WindDir]
      ).toString();

      // todo: skip duplicated entries
      /*         const result =
          index > 0 &&
          oneMinuteObject.Date < accumulator[accumulator.length - 1].Date
            ? accumulator
            : [...accumulator, oneMinuteObject]; */

      return [...accumulator, oneMinuteObject];
    }, []);

    return arrOfObj;
  };

  const textToArrayAllFiles = queries.reduce<pureData[]>((acc, query) => {
    if (!query.data) return acc;

    const textToArray = (text: string) => {
      const lines = text.trim().split('\n');
      lines.shift();
      lines.shift();
      lines.shift();

      return /..\...\.......:../.test(lines[0]) ? lines : [];
    };

    if (!query.data) return acc;

    const linesToObjectForOneFile = linesToObject(textToArray(query.data));

    return [...acc, ...linesToObjectForOneFile];
  }, []);

  return {
    graphsData: [
      { ...graphsConfig[0], data: textToArrayAllFiles as pureData[] },
    ],
    isFetching: queries.some((query) => query.isFetching),
    isSuccess: queries.some((query) => query.isSuccess),
    isSuccessPercentage: Math.round(
      (queries.reduce((acc, query) => (query.isSuccess ? ++acc : acc), 0) *
        100) /
        queries.length
    ),
  };
};
