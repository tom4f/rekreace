import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, renderHook } from '@testing-library/react';
import { resolveHandlers } from 'features/mocks';
import { setupServer } from 'msw/node';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

const server = setupServer(...resolveHandlers());

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});

afterEach(() => {
  server.resetHandlers();
  localStorage.removeItem('mocks');
});

afterAll(() => server.close());

export const renderWithProviders = (
  component: ReactElement,
  withRouter = true
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  const wrapper: FC<PropsWithChildren<object>> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {withRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </QueryClientProvider>
    );
  };
  return { ...render(component, { wrapper }) };
};

export const renderHookWithProviders = <Props, Result>(
  hook: (initialProps: Props) => Result,
  endpointsConfig?: { [key: string]: string }
) => {
  if (endpointsConfig) {
    localStorage.setItem('mocks', JSON.stringify(endpointsConfig));
  }

  server.use(...resolveHandlers());

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  const wrapper: FC<PropsWithChildren<object>> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    );
  };

  return { ...renderHook(hook, { wrapper }) };
};
