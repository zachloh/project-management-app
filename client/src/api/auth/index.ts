import { useMutation, useQueryClient } from '@tanstack/react-query';

import { customAxios } from 'lib/axios';
import { User } from 'types';
import storage from 'utils/storage';

type UserResponse = {
  token: string;
  user: User;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const login = async (loginData: LoginData): Promise<UserResponse> => {
  const { data } = await customAxios.post<UserResponse>(
    '/users/login',
    loginData
  );
  return data;
};

const register = async (registerData: RegisterData): Promise<UserResponse> => {
  const { data } = await customAxios.post<UserResponse>(
    '/users/register',
    registerData
  );
  return data;
};

const loginAsGuest = async (): Promise<UserResponse> => {
  const { data } = await customAxios.post<UserResponse>('/users/demo', {
    mode: 'demo',
  });
  return data;
};

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const { token, user } = data;
      storage.setToken(token);
      queryClient.setQueryData(['auth-user'], user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const { token, user } = data;
      storage.setToken(token);
      queryClient.setQueryData(['auth-user'], user);
    },
  });

  const logout = () => {
    storage.clearToken();
    queryClient.clear();
  };

  const loginAsGuestMutation = useMutation({
    mutationFn: loginAsGuest,
    onSuccess: (data) => {
      const { token, user } = data;
      storage.setToken(token);
      queryClient.setQueryData(['auth-user'], user);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isLoading,
    logout,
    loginAsGuest: loginAsGuestMutation.mutate,
    isLoggingInAsGuest: loginAsGuestMutation.isLoading,
  };
};
