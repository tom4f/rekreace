import { Url } from 'api/paths';

export enum MeteoFilesEnum {
  LIPNONET_METEO = `${Url.DAVIS}/lipnonet_meteo.txt`,
  NOAAMO = `${Url.DAVIS}/archive/{{year}}/NOAAMO-{{year}}-{{month}}.TXT`,
  NOAAYR = `${Url.DAVIS}/archive/{{year}}/NOAAYR-{{year}}.TXT`,
  DOWNLD02_NR = `${Url.DAVIS}/archive/downld02-{{meteoFileId}}.txt`,
  DOWNLD02 = `${Url.DAVIS}/downld02.txt`,
  DATA_DAVIS = `${Url.DAVIS}/data_davis.txt`,
  DATA_DAVIS_JSON = `${Url.DAVIS}/data_davis_json.txt`,
}
