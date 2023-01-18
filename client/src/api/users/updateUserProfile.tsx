/* eslint-disable @typescript-eslint/no-floating-promises */
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { ExclamationMark } from 'tabler-icons-react';

import { customAxios } from 'lib/axios';
import { User } from 'types';

type UserData = {
  firstName: string;
  lastName: string;
  position: string;
};

const updateUserProfile = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: UserData;
}): Promise<User> => {
  const { data } = await customAxios.patch<User>(
    `/users/${userId}/profile`,
    userData
  );
  return data;
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onMutate: async ({ userData }) => {
      await queryClient.cancelQueries({ queryKey: ['auth-user'] });

      const previousUserData = queryClient.getQueryData<User>(['auth-user']);

      queryClient.setQueryData<User>(['auth-user'], (old) => {
        if (old) {
          return {
            ...old,
            ...userData,
          };
        }

        return old;
      });

      return { previousUserData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['auth-user'], context?.previousUserData);
      showNotification({
        title: 'Error',
        message: 'Update failed. Please try again later.',
        color: 'red',
        icon: <ExclamationMark />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
    },
  });
};
