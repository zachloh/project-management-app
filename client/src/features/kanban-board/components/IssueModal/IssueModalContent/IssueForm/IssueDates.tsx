import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

function IssueDates() {
  return (
    <>
      <Text size="sm" color="dark.3" fw={700}>
        {`Created: ${dayjs().format('D MMM YYYY')}`}
      </Text>
      <Text size="sm" color="dark.3" fw={700}>
        {`Updated: ${dayjs().format('D MMM YYYY')}`}
      </Text>
      <Text size="sm" color="dark.3" fw={700}>
        {`Completed: ${dayjs().format('D MMM YYYY')}`}
      </Text>
    </>
  );
}

export default IssueDates;
