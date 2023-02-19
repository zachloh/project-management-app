import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from 'lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

function AppProviders({ children }: AppProviderProps) {
  return (
    <MantineProvider
      withCSSVariables
      theme={{
        primaryColor: 'violet',
        components: {
          InputWrapper: {
            styles: {
              label: {
                fontWeight: 700,
              },
            },
          },
          Select: {
            styles: (theme) => ({
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: theme.colors.indigo[1],
                    color: 'inherit',
                  },
                },
              },
            }),
          },
          Skeleton: {
            defaultProps: {
              radius: 'xl',
            },
          },
        },
      }}
    >
      <NotificationsProvider autoClose={3000} position="bottom-center">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default AppProviders;
