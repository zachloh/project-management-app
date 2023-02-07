import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { User, Organization } from 'types';
import { refetchUserOnError } from 'utils/refetchUserOnError';

type UserData = {
  role: User['role'];
};

const updateUserRole = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: UserData;
}): Promise<User> => {
  const { data } = await customAxios.patch<User>(
    `/users/${userId}/role`,
    userData
  );
  return data;
};

export const useUpdateUserRole = (orgId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data) => {
      queryClient.setQueryData<Organization>(['org', orgId], (old) => {
        if (old) {
          const newMembers = old.members.map((member) => {
            if (member._id === data._id) {
              return {
                ...member,
                role: data.role,
              };
            }

            return member;
          });

          return {
            ...old,
            members: newMembers,
          };
        }

        return old;
      });
    },
    onError: (err) => {
      refetchUserOnError(err, queryClient);
    },
  });
};
