import { delay, http } from 'msw';
import { postLoginMock } from '../login';
import { getForumMock } from '../forum';
import { getBookingMock } from '../booking';
import {
  getTextFileMock,
  getMultipleTextFileMock,
  getDavisMock,
  getLipnoMock,
  getOldStationMock,
} from '../meteo';

import { LOCAL_STORAGE_MOCK_DELAY_KEY } from './mockResolver';

const globalDelay = http.all('/api/*', async () => {
  await delay(
    parseInt(localStorage.getItem(LOCAL_STORAGE_MOCK_DELAY_KEY) || '0')
  );
});

export const resolveHandlers = () => [
  globalDelay,
  ...postLoginMock(),
  ...getForumMock(),
  ...getBookingMock(),
  ...getTextFileMock(),
  ...getMultipleTextFileMock[0](),
  ...getMultipleTextFileMock[1](),
  ...getMultipleTextFileMock[2](),
  ...getMultipleTextFileMock[3](),
  ...getMultipleTextFileMock[4](),
  ...getMultipleTextFileMock[5](),
  ...getMultipleTextFileMock[6](),
  ...getDavisMock(),
  ...getLipnoMock(),
  ...getOldStationMock(),
];
