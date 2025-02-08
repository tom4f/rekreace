import { HttpHandler } from 'msw';

export enum MockResolver {
  DEFAULT_STATE = 'default',
  LOCAL_STORAGE_MOCK_KEY = 'mocks',
  LOCAL_STORAGE_MOCK_DELAY_KEY = 'mocks_delay',
}

export const resolveMock = (
  handler: HttpHandler[],
  scenarios: { [key: string]: HttpHandler[] },
  endpoint: string
) => {
  const settings = JSON.parse(
    localStorage.getItem(MockResolver.LOCAL_STORAGE_MOCK_KEY) || '{}'
  );

  if (
    settings &&
    endpoint &&
    settings[endpoint] &&
    //scenarios &&
    scenarios[settings[endpoint]] &&
    settings[endpoint] !== MockResolver.DEFAULT_STATE
  ) {
    return scenarios[settings[endpoint]];
  }

  return handler;
};
