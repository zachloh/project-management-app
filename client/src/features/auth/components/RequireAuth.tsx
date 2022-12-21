import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'api/auth';
import { useGetUser } from 'api/users/getUser';
import Loader from 'components/Loader';

type RequireAuthProps = {
  children: React.ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const { data: user, isLoading, isError } = useGetUser();
  const { logout } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    logout();
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  if (user) {
    if (user.completedWelcome) {
      return <>{children}</>;
    }
    return <Navigate to="/welcome" replace />;
  }

  logout();
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
