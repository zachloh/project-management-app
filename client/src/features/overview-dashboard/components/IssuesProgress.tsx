import { RingProgress, Text } from '@mantine/core';
import React from 'react';

function IssuesProgress() {
  return (
    <div style={{ display: 'grid' }}>
      <RingProgress
        sections={[
          { value: 60, color: 'gray.2', tooltip: 'Created issues: 10' },
          { value: 40, color: 'violet', tooltip: 'Completed issues: 4' },
        ]}
        size={200}
        roundCaps
        thickness={16}
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Text size={36} align="center" color="violet" weight="700">
            40%
          </Text>
        }
        sx={{ justifySelf: 'center' }}
      />
      <Text align="center" color="dark.4" weight="700">
        40% of 10 issues completed
      </Text>
    </div>
  );
}

export default IssuesProgress;
