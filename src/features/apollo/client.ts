import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import * as Sentry from '@sentry/react';
import { Url } from 'api/paths';
import { useAuthStore } from 'src/store';

const errorLink = new ErrorLink(({ error }) => {
  // GraphQL errors: error has 'errors' array
  if (error && Array.isArray((error as any).errors)) {
    (error as any).errors.forEach((err: any) => {
      const { message, locations, path, extensions } = err;
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
  // Network error: error has 'statusCode'
  if (error && typeof (error as any).statusCode === 'number' && (error as any).statusCode === 401) {
    useAuthStore.getState().logout();
  }
});

const httpLink = new HttpLink({ uri: Url.GRAPH_QL_API });

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...prevContext.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

export const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
