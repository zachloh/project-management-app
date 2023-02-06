/* eslint-disable @typescript-eslint/no-floating-promises */
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const refetchUserOnError = (err: unknown, queryClient: QueryClient) => {
  if (axios.isAxiosError(err) && err.response?.status === 401) {
    queryClient.invalidateQueries(
      {
        queryKey: ['auth-user'],
      },
      {
        cancelRefetch: false,
      }
    );
  }
};
