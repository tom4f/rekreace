import { useQuery, useQueries } from '@tanstack/react-query';
import { apiGet } from '../../../api/utils/get';
import { Url } from '../../../api/paths';
import { useState, useEffect } from 'react';

export enum MeteoFiles {
  LIPNONET_METEO = `${Url.DAVIS}/lipnonet_meteo.txt`,
  NOAAMO = `${Url.DAVIS}/archive/{{year}}/NOAAMO-{{year}}-{{month}}.TXT`,
  NOAAYR = `${Url.DAVIS}/archive/{{year}}/NOAAYR-{{year}}.TXT`,
  DOWNLD02_NR = `${Url.DAVIS}/archive/downld02-{{correctedDay}}.txt`,
  DOWNLD02 = `${Url.DAVIS}/downld02.txt`,
}

export const GET_TEXT_KEY = 'getTextFile';

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
    queryKey: [urlKey],
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
        queryKey: [GET_TEXT_KEY, NOAAYR.split('/').pop()],
        queryFn: () => getTextFile(NOAAYR),
        placeholderData: previousData[0],
      },
      {
        queryKey: [GET_TEXT_KEY, NOAAMO.split('/').pop()],
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
