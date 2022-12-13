import { Card, Group } from '@mantine/core';
import React from 'react';
import { Box } from 'tabler-icons-react';

import styles from './AuthLayout.module.css';

type AuthLayoutProps = {
  title: string;
  children: React.ReactNode;
};

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <Card shadow="sm" p={30} radius="md" withBorder className={styles.card}>
        <Group spacing={4} mb={30} position="center">
          <Box size={60} color="#845EF7" />
          <div className={styles.logo}>ProjectHub</div>
        </Group>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </Card>
    </div>
  );
}

export default AuthLayout;
