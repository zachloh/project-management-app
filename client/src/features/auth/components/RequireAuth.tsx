import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from 'api/auth';
import { useGetUser } from 'api/users/getUser';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import ServerError from 'components/ServerError';

export function RequireAuth() {
  const { data: user, isLoading, isError, error, refetch } = useGetUser();
  const { logout } = useAuth();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch({ cancelRefetch: false });
  }, [location.pathname, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout();
      return (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
      );
    }

    queryClient.removeQueries({ queryKey: ['org'] });
    queryClient.removeQueries({ queryKey: ['projects'] });
    queryClient.removeQueries({ queryKey: ['issues'] });
    return <ServerError />;
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
