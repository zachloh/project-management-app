import { Button, Group, Select, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { ExclamationMark } from 'tabler-icons-react';
import { z } from 'zod';

import { useCreateProject } from 'api/projects/createProject';
import { User } from 'types';

type CreateProjectFormProps = {
  onClose: () => void;
  user: User;
};

type FormValues = {
  name: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};

const createProjectSchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter your project name' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your project description' }),
});

function CreateProjectForm({ onClose, user }: CreateProjectFormProps) {
  const createProjectMutation = useCreateProject();

  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      category: 'business',
    },
    validate: zodResolver(createProjectSchema),
  });

  const handleSubmit = (values: FormValues) => {
    const { name, description, category } = values;

    createProjectMutation.mutate(
      {
        name,
        description,
        category,
        orgId: user.org?._id,
        userId: user._id,
        isDemo: user.isDemo,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          showNotification({
            title: 'Error',
            message: 'Failed to create project. Please try again.',
            color: 'red',
            icon: <ExclamationMark />,
          });
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Name"
        mb={15}
        withAsterisk
        {...form.getInputProps('name')}
      />
      <Textarea
        label="Description"
        minRows={4}
        mb={15}
        withAsterisk
        {...form.getInputProps('description')}
      />
      <Select
        label="Category"
        data={[
          { value: 'business', label: 'Business' },
          { value: 'marketing', label: 'Marketing' },
          { value: 'software', label: 'Software' },
        ]}
        withAsterisk
        {...form.getInputProps('category')}
      />
      <Group position="right" spacing={20} mt={20}>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="filled"
          disabled={!form.isDirty()}
          loading={
            createProjectMutation.isLoading || createProjectMutation.isSuccess
          }
        >
          Create
        </Button>
      </Group>
    </form>
  );
}

export default CreateProjectForm;
