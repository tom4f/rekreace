import { http, HttpHandler, HttpResponse } from 'msw';

import { resolveMock } from '../mockResolver';

const mockHandler: HttpHandler[] = [
  http.get('/', async () => {
    return HttpResponse.json({ handler: 'ok' });
  }),
];

const scenarios = {
  testScenario: [
    http.get('/', async () => {
      return HttpResponse.json({ handler: 'ok' });
    }),
  ],
};

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('resolveMock', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    localStorage.setItem('mocks', JSON.stringify({ '/': 'testScenario' }));
  });

  it('should use handler when scenarios is empty', () => {
    window.location.search = '';
    const result = resolveMock(mockHandler, {}, '/');
    expect(result).toBe(mockHandler);
  });

  it('should use scenario handler when scenarios is not empty and matches', () => {
    const scenarioName = 'testScenario';
    const result = resolveMock(mockHandler, scenarios, '/');
    expect(result).toBe(scenarios[scenarioName]);
  });
});
