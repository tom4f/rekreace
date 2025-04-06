import {
  ALARM_LOGIN_ENDPOINT,
  ALARM_PASSWORD_ENDPOINT,
  alarmCounterScenarios,
  alarmLoginScenarios,
  alarmPasswordMock,
  GET_ALARM_COUNTER_ENDPOINT,
  getDavisDataJsonScenarios,
  getDavisDataScenarios,
  UPDATE_ALARM_ENDPOINT,
  updateAlarmMock,
} from 'features/meteoalarm';
import {
  GET_CATEGORY_ENDPOINT,
  GET_PHOTO_ENDPOINT,
  getCategoryScenarios,
  getPhotoScenarios,
} from 'features/photo';
import { GraphQLHandler, HttpHandler } from 'msw';
import { Url } from 'src/api/paths';

import { GET_BOOKING_ENDPOINT, getBookingScenarios } from '../booking';
import { GET_FORUM_ENDPOINT, getForumScenarios } from '../forum';
import { getForumGraphQLScenarios } from '../forum/mock/getForumGraphQLMock';
import {
  JWT_LOGIN_ENDPOINT,
  jwtLoginScenarios,
  LOGIN_ENDPOINT,
  postLoginScenarios,
} from '../login';
import {
  GET_DAVIS_ENDPOINT,
  GET_LIPNO_ENDPOINT,
  GET_OLD_STATION_ENDPOINT,
  getDavisScenarios,
  getLipnoScenarios,
  getMultipleTextFileScenarios,
  getOldStationScenarios,
  getTextFileScenarios,
  MeteoFilesEnum,
} from '../meteo';

export const availableScenarios: [
  string,
  { [key: string]: HttpHandler[] | GraphQLHandler[] }
][] = [
  [JWT_LOGIN_ENDPOINT, jwtLoginScenarios],
  [LOGIN_ENDPOINT, postLoginScenarios],
  [GET_FORUM_ENDPOINT, getForumScenarios],
  [GET_BOOKING_ENDPOINT, getBookingScenarios],
  [MeteoFilesEnum.DOWNLD02, getTextFileScenarios],
  [GET_DAVIS_ENDPOINT, getDavisScenarios],
  [GET_LIPNO_ENDPOINT, getLipnoScenarios],
  [GET_OLD_STATION_ENDPOINT, getOldStationScenarios],
  [ALARM_LOGIN_ENDPOINT, alarmLoginScenarios],
  [GET_ALARM_COUNTER_ENDPOINT, alarmCounterScenarios],
  [MeteoFilesEnum.DATA_DAVIS, getDavisDataScenarios],
  [MeteoFilesEnum.DATA_DAVIS_JSON, getDavisDataJsonScenarios],
  [UPDATE_ALARM_ENDPOINT, updateAlarmMock],
  [ALARM_PASSWORD_ENDPOINT, alarmPasswordMock],
  [GET_CATEGORY_ENDPOINT, getCategoryScenarios],

  [GET_PHOTO_ENDPOINT, getPhotoScenarios],
  [Url.GRAPH_QL_API, getForumGraphQLScenarios],
  ...getMultipleTextFileScenarios,
];
