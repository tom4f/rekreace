import './index.css';

import {
  ApolloClient,
  ApolloProvider,
  from,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Url } from 'api/paths';
import { MockResolver } from 'features/mocks';
import { SetupWorker } from 'msw/browser';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import { MockDevTools } from './components/MockDevTools';
import { APP_MOCKS, ENV_MODE } from './env';

Sentry.init({
  dsn: 'https://338f7ab170112283b02c4492f84febae@o4509005275267072.ingest.de.sentry.io/4509005278085200',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/(www\.)?olca\.cz/,
    /^https:\/\/(www\.)?frymurk\.com/,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

let worker: SetupWorker | null;

const enableMocking = async () => {
  if (!APP_MOCKS || ENV_MODE === 'production') {
    return;
  }

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      Sentry.captureException(
        new Error(`[GraphQL error]: Message: ${message}, Path: ${path}`)
      );
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    Sentry.captureException(
      new Error(`[Network error]: ${networkError.message}`)
    );
    console.error(`[Network error]:`, networkError);
  }
});

const httpLink = new HttpLink({
  uri: 'https://your-graphql-endpoint.com/graphql',
});

const apolloClient = new ApolloClient({
  uri: Url.GRAPH_QL_API,
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Router basename='/rekreace'>
            {ENV_MODE !== 'production' && APP_MOCKS && <MockDevTools />}
            <App />
          </Router>
        </QueryClientProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
});
