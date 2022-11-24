import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React from 'react';

import { FormValues } from './types';

function TitleInput({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <TextInput
      label="Title"
      withAsterisk
      {...form.getInputProps('title')}
      mb={10}
    />
  );
}

export default TitleInput;
