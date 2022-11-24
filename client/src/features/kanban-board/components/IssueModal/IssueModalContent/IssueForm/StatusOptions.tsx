import { Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormValues } from './types';

function StatusOptions({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <Select
      label="Status"
      withAsterisk
      data={[
        { value: 'to do', label: 'TO DO' },
        { value: 'in progress', label: 'IN PROGRESS' },
        { value: 'in review', label: 'IN REVIEW' },
        { value: 'done', label: 'DONE' },
      ]}
      {...form.getInputProps('status')}
    />
  );
}

export default StatusOptions;
