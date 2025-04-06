import './index.css';
import 'features/sentry/init';

import { ApolloProvider } from '@apollo/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MockDevTools } from 'components/MockDevTools';
import { apolloClient } from 'features/apollo/client';
import { enableMocking } from 'features/mocks/enableMocks';
import { queryClient } from 'features/query/queryClient';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import { APP_MOCKS, ENV_MODE } from './env';

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
