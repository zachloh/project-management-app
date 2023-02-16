import { Title, Text, Group, Button, Box } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'tabler-icons-react';

import styles from './NotFound.module.css';

function NotFound() {
  return (
    <Box>
      <div className={styles.status}>404</div>
      <Title
        order={1}
        align="center"
        mt={30}
        color="dark.5"
        className={styles.title}
      >
        Page Not Found
      </Title>
      <Text
        color="gray.7"
        align="center"
        mt={20}
        mx="auto"
        maw={400}
        className={styles.message}
      >
        Sorry, the page you are looking for does not exist or is currently not
        available.
      </Text>
      <Group position="center" mt={30}>
        <Button
          size="md"
          leftIcon={<Home size={18} />}
          component={Link}
          to="/dashboard"
        >
          Back to Home
        </Button>
      </Group>
    </Box>
  );
}

export default NotFound;
