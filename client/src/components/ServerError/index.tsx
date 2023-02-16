import { Title, Text, Group, Button, Box } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Refresh } from 'tabler-icons-react';

import styles from './ServerError.module.css';

function ServerError() {
  const navigate = useNavigate();

  return (
    <Box pt={100} px={30}>
      <div className={styles.status}>500</div>
      <Title
        order={1}
        align="center"
        mt={30}
        color="dark.5"
        className={styles.title}
      >
        Oops! Something went wrong...
      </Title>
      <Text color="gray.7" align="center" mt={20} className={styles.message}>
        Sorry, we are working on fixing the problem.
      </Text>
      <Group position="center" mt={30}>
        <Button
          size="md"
          leftIcon={<Refresh size={18} />}
          onClick={() => navigate(0)}
        >
          Refresh Page
        </Button>
      </Group>
    </Box>
  );
}

export default ServerError;
