import { Select, Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { FormEvent } from 'react';

import { WelcomeFormValues } from 'features/user/types';

type CreateProjectFormProps = {
  form: UseFormReturnType<WelcomeFormValues>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function CreateProjectForm({ form, handleSubmit }: CreateProjectFormProps) {
  return (
    <form id="create-project-form" onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        {...form.getInputProps('name')}
        size="md"
        mb={15}
      />
      <Textarea
        label="Description"
        {...form.getInputProps('description')}
        size="md"
        minRows={4}
        mb={15}
      />
      <Select
        label="Category"
        data={[
          { value: 'business', label: 'Business' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'software', label: 'Software' },
        ]}
        {...form.getInputProps('category')}
        size="md"
      />
    </form>
  );
}

export default CreateProjectForm;
