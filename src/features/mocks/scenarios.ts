import {
  ALARM_LOGIN_ENDPOINT,
  alarmCounterScenarios,
  alarmLoginScenarios,
  GET_ALARM_COUNTER_ENDPOINT,
  getDavisDataJsonScenarios,
  getDavisDataScenarios,
} from 'features/meteoalarm';
import { HttpHandler } from 'msw';

import { GET_BOOKING_ENDPOINT, getBookingScenarios } from '../booking';
import { GET_FORUM_ENDPOINT, getForumScenarios } from '../forum';
import { LOGIN_ENDPOINT, postLoginScenarios } from '../login';
import {
  GET_DAVIS_ENDPOINT,
  GET_LIPNO_ENDPOINT,
  GET_OLD_STATION_ENDPOINT,
  getDavisScenarios,
  getLipnoScenarios,
  getMultipleTextFileScenarios,
  getOldStationScenarios,
  getTextFileScenarios,
  MeteoFiles,
} from '../meteo';

export const availableScenarios: [string, { [key: string]: HttpHandler[] }][] =
  [
    [LOGIN_ENDPOINT, postLoginScenarios],
    [GET_FORUM_ENDPOINT, getForumScenarios],
    [GET_BOOKING_ENDPOINT, getBookingScenarios],
    [MeteoFiles.DOWNLD02, getTextFileScenarios],
    [GET_DAVIS_ENDPOINT, getDavisScenarios],
    [GET_LIPNO_ENDPOINT, getLipnoScenarios],
    [GET_OLD_STATION_ENDPOINT, getOldStationScenarios],
    [ALARM_LOGIN_ENDPOINT, alarmLoginScenarios],
    [GET_ALARM_COUNTER_ENDPOINT, alarmCounterScenarios],
    [MeteoFiles.DATA_DAVIS, getDavisDataScenarios],
    [MeteoFiles.DATA_DAVIS_JSON, getDavisDataJsonScenarios],
    ...getMultipleTextFileScenarios,
  ];
