import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from 'api/auth';
import { useGetUser } from 'api/users/getUser';
import Loader from 'components/Loader';

import styles from './Welcome.module.css';
import WelcomeForm from './WelcomeForm';

export function Welcome() {
  const { data: user, isLoading, isError } = useGetUser();
  const { logout } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !user) {
    logout();
    return <Navigate to="/login" replace />;
  }

  if (user.completedWelcome) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className={styles.container}>
      <WelcomeForm user={user} />
    </div>
  );
}
