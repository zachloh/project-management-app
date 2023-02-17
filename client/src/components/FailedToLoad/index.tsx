import { Alert, Center } from '@mantine/core';
import React from 'react';
import { AlertCircle } from 'tabler-icons-react';

import styles from './FailedToLoad.module.css';

function FailedToLoad() {
  return (
    <Center mih={200}>
      <Alert
        icon={<AlertCircle size={18} />}
        title="Failed to load :("
        color="red.9"
        classNames={{ title: styles.title, message: styles.message }}
      >
        Refresh the page to try again
      </Alert>
    </Center>
  );
}

export default FailedToLoad;
