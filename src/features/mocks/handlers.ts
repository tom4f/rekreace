import { delay, http } from 'msw';
import { postLoginMock } from '../login';
import { getForumMock } from '../forum';

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
];
