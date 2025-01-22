import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { APP_MOCKS, ENV_MODE } from './env';
import { LOCAL_STORAGE_MOCK_KEY } from './features/mocks';
import { SetupWorker } from 'msw/browser';
import { MockDevTools } from './components/MockDevTools';

let worker: SetupWorker | null;

const enableMocking = async () => {
  if (!APP_MOCKS || ENV_MODE === 'production') {
    return;
  }

  const { setupWorker } = await import('msw/browser');
  const { resolveHandlers } = await import('./features/mocks/handlers');
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
  if (localStorage.getItem(LOCAL_STORAGE_MOCK_KEY)) {
    await reinitializeMocking();
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router basename='/rekreace'>
          {ENV_MODE !== 'production' && APP_MOCKS && <MockDevTools />}
          <App />
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
