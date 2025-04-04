import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import * as Sentry from '@sentry/react';
import { Url } from 'api/paths';
import { useAuthStore } from 'src/store';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      Sentry.captureException(
        new Error(`[GraphQL error]: Message: ${message}, Path: ${path}`)
      );
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      if (extensions?.code === 'UNAUTHENTICATED') {
        useAuthStore.getState().logout();
      }
    });
  }

  if (
    networkError &&
    'statusCode' in networkError &&
    networkError.statusCode === 401
  ) {
    useAuthStore.getState().logout();
  }
});

const httpLink = new HttpLink({ uri: Url.GRAPH_QL_API });

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

export const apolloClient = new ApolloClient({
  uri: Url.GRAPH_QL_API,
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
