import { useQueries, useQuery } from '@tanstack/react-query';
import { apiGet } from 'api/utils/get';
import { useEffect, useState } from 'react';

import { MeteoFilesEnum } from './enum/MeteoFilesEnum';
import { MeteoGetKey } from './useLoadWeather';

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
    queryKey: [MeteoGetKey.TEXT, urlKey],
    queryFn: () => getTextFile(url),
    refetchInterval,
  });
};

export const useGetNOAA = (year: string, month: string) => {
  const [previousData, setPreviousData] = useState<string[]>([]);

  const NOAAYR = MeteoFilesEnum.NOAAYR.replace(/{{year}}/g, year.toString());
  const NOAAMO = MeteoFilesEnum.NOAAMO.replace(
    /{{year}}/g,
    year.toString()
  ).replace('{{month}}', month);

  const queries = useQueries({
    queries: [
      {
        queryKey: [MeteoGetKey.NOAA, NOAAYR.split('/').pop()],
        queryFn: () => getTextFile(NOAAYR),
        placeholderData: previousData[0],
      },
      {
        queryKey: [MeteoGetKey.NOAA, NOAAMO.split('/').pop()],
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

  let meteoTextFiles = [0, 1, 2, 3, 4, 5].map((id) => {
    const meteoTextFilesId =
      dayOfWeekNow + id > 6 ? dayOfWeekNow + id - 7 : dayOfWeekNow + id;
    return MeteoFilesEnum.DOWNLD02_NR.replace(
      '{{meteoFileId}}',
      meteoTextFilesId.toString()
    );
  });

  meteoTextFiles = [...meteoTextFiles, MeteoFilesEnum.DOWNLD02];

  const queries = meteoTextFiles.map((filePath) => ({
    queryKey: [MeteoGetKey.DOWNLD02, filePath.split('/').pop()],
    queryFn: () => getTextFile(filePath),
  }));

  return useQueries({ queries });
};
