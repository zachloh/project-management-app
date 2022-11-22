import { Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormValues } from './types';

function DescriptionInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <Textarea
      label="Description"
      placeholder="Add a description..."
      minRows={4}
      {...form.getInputProps('description')}
      mb={10}
    />
  );
}

export default DescriptionInput;
