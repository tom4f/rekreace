import { MockResolver } from 'features/mocks';
import { SetupWorker } from 'msw/browser';
import { APP_MOCKS, ENV_MODE } from 'src/env';

let worker: SetupWorker | null;

export const enableMocking = async () => {
  if (!APP_MOCKS || ENV_MODE === 'production') return;

  const { setupWorker } = await import('msw/browser');
  const { resolveHandlers } = await import('features/mocks');
  worker = setupWorker(...resolveHandlers());

  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: { url: '/rekreace/mockServiceWorker.js' },
  });

  return worker;
};

const reinitializeMocking = async () => {
  if (worker) {
    worker.stop();
    worker = null;
  }
  await enableMocking();
};

window.addEventListener('localStorageChange', async () => {
  if (localStorage.getItem(MockResolver.LOCAL_STORAGE_MOCK_KEY)) {
    await reinitializeMocking();
  }
});
