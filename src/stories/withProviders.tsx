import { Decorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resolveHandlers } from 'features/mocks';
import { setupWorker } from 'msw/browser';
import { MemoryRouter } from 'react-router-dom';

const worker = setupWorker(...resolveHandlers());
worker.start();

export const withProviders: Decorator = (Story) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </QueryClientProvider>
  );
};
