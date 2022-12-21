import { Select, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { FormEvent } from 'react';

import { WelcomeFormValues } from 'features/user/types';

type CreateOrgFormProps = {
  form: UseFormReturnType<WelcomeFormValues>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function CreateOrgForm({ form, handleSubmit }: CreateOrgFormProps) {
  return (
    <form id="create-org-form" onSubmit={handleSubmit}>
      <TextInput
        label="Organization"
        placeholder="Atlassian"
        {...form.getInputProps('organization')}
        size="md"
        mb={15}
      />
      <TextInput
        label="Position"
        placeholder="Software Engineer"
        {...form.getInputProps('position')}
        size="md"
        mb={15}
      />
      <Select
        label="Role"
        description="Only 'Admin' is allowed in demo"
        readOnly
        disabled
        data={[{ value: 'admin', label: 'Admin' }]}
        {...form.getInputProps('role')}
        size="md"
        inputWrapperOrder={['label', 'input', 'description', 'error']}
      />
    </form>
  );
}

export default CreateOrgForm;
