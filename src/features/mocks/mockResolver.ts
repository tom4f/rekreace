import { HttpHandler } from 'msw';

export const DEFAULT_STATE = 'default';
export const LOCAL_STORAGE_MOCK_KEY = 'mocks';
export const LOCAL_STORAGE_MOCK_DELAY_KEY = 'mocks_delay';

export const resolveMock = (
  handler: HttpHandler[],
  scenarios: { [key: string]: HttpHandler[] },
  endpoint: string
) => {
  const settings = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_MOCK_KEY) || '{}'
  );

  if (
    settings &&
    endpoint &&
    settings[endpoint] &&
    //scenarios &&
    scenarios[settings[endpoint]] &&
    settings[endpoint] !== DEFAULT_STATE
  ) {
    return scenarios[settings[endpoint]];
  }

  return handler;
};
