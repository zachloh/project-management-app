import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'api/auth';
import { useGetUser } from 'api/users/getUser';
import Loader from 'components/Loader';

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { data: user, isLoading, isError } = useGetUser();
  const { logout } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (user) {
    return <>{children}</>;
  }

  logout();
  return <Navigate to="/login" replace />;
}
