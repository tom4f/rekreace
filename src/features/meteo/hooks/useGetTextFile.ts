import { useQuery, useQueries } from '@tanstack/react-query';
import { apiGet } from '../../../api/utils/get';
import { Url } from '../../../api/paths';
import { useState, useEffect } from 'react';
import { MeteoKey } from './useLoadWeather';

export enum MeteoFiles {
  LIPNONET_METEO = `${Url.DAVIS}/lipnonet_meteo.txt`,
  NOAAMO = `${Url.DAVIS}/archive/{{year}}/NOAAMO-{{year}}-{{month}}.TXT`,
  NOAAYR = `${Url.DAVIS}/archive/{{year}}/NOAAYR-{{year}}.TXT`,
  DOWNLD02_NR = `${Url.DAVIS}/archive/downld02-{{meteoFileId}}.txt`,
  DOWNLD02 = `${Url.DAVIS}/downld02.txt`,
}

export const getTextFile = async (url: string): Promise<string> => {
  const response = await apiGet({
    url,
    responseType: 'text',
  });
  return response;
};

export const useGetTextFile = (url: string, refetchInterval?: number) => {
  const urlKey = url.split('/').pop();
  return useQuery({
    queryKey: [MeteoKey.TEXT, urlKey],
    queryFn: () => getTextFile(url),
    refetchInterval,
  });
};

export const useGetNOAA = (year: string, month: string) => {
  const [previousData, setPreviousData] = useState<string[]>([]);

  const NOAAYR = MeteoFiles.NOAAYR.replace(/{{year}}/g, year.toString());
  const NOAAMO = MeteoFiles.NOAAMO.replace(
    /{{year}}/g,
    year.toString()
  ).replace('{{month}}', month);

  const queries = useQueries({
    queries: [
      {
        queryKey: [MeteoKey.NOAA, NOAAYR.split('/').pop()],
        queryFn: () => getTextFile(NOAAYR),
        placeholderData: previousData[0],
      },
      {
        queryKey: [MeteoKey.NOAA, NOAAMO.split('/').pop()],
        queryFn: () => getTextFile(NOAAMO),
        placeholderData: previousData[1],
      },
    ],
  });

  const [NOAAYRdata, NOAAMOdata] = queries.map((query) => query.data);

  useEffect(() => {
    setPreviousData([NOAAYRdata || '', NOAAMOdata || '']);
  }, [NOAAYRdata, NOAAMOdata]);

  return queries;
};

export const useGetDownld02 = () => {
  const dayOfWeekNow = new Date().getUTCDay();

  let meteoFiles = [0, 1, 2, 3, 4, 5].map((id) => {
    const meteoFilesId =
      dayOfWeekNow + id > 6 ? dayOfWeekNow + id - 7 : dayOfWeekNow + id;
    return MeteoFiles.DOWNLD02_NR.replace(
      '{{meteoFileId}}',
      meteoFilesId.toString()
    );
  });

  meteoFiles = [...meteoFiles, MeteoFiles.DOWNLD02];

  const queries = meteoFiles.map((filePath) => ({
    queryKey: [MeteoKey.DOWNLD02, filePath.split('/').pop()],
    queryFn: () => getTextFile(filePath),
  }));

  return useQueries({ queries });
};
