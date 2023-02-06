import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'api/auth';
import { useGetUser } from 'api/users/getUser';
import Layout from 'components/Layout';
import Loader from 'components/Loader';

export function RequireAuth() {
  const { data: user, isLoading, isError, refetch } = useGetUser();
  const { logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch({ cancelRefetch: false });
  }, [location.pathname, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    logout();
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  if (user) {
    if (user.completedWelcome) {
      return <Layout user={user} />;
    }
    return <Navigate to="/welcome" replace />;
  }

  logout();
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
