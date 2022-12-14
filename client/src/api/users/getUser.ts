import { useQuery } from '@tanstack/react-query';
import jwt_decode, { JwtPayload } from 'jwt-decode';

import { customAxios } from 'lib/axios';
import { User } from 'types';
import storage from 'utils/storage';

type Payload = JwtPayload & {
  _id: string;
};

const getUser = async (): Promise<User | null> => {
  const token = storage.getToken();
  if (token) {
    const decoded = jwt_decode<Payload>(token);
    const userId = decoded._id;
    const { data } = await customAxios.get<User>(`/users/${userId}`);
    return data;
  }
  return null;
};

export const useGetUser = () =>
  useQuery({
    queryKey: ['auth-user'],
    queryFn: getUser,
  });
