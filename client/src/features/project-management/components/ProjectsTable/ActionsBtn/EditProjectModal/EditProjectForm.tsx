import { Button, Group, Select, Textarea, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { ExclamationMark } from 'tabler-icons-react';
import { z } from 'zod';

import { useUpdateProject } from 'api/projects/updateProject';
import { Project } from 'types';

type EditProjectFormProps = {
  onClose: () => void;
  project: Project;
  orgId: string | undefined;
};

const editProjectSchema = z.object({
  name: z.string().trim().min(1, { message: 'Please enter your project name' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your project description' }),
});

function EditProjectForm({ onClose, project, orgId }: EditProjectFormProps) {
  const updateProjectMutation = useUpdateProject(orgId);

  const form = useForm({
    initialValues: {
      name: project.name,
      description: project.description,
      category: project.category,
    },
    validate: zodResolver(editProjectSchema),
  });

  type FormValues = typeof form.values;

  const handleSubmit = (values: FormValues) => {
    updateProjectMutation.mutate(
      {
        projectId: project._id,
        projectData: values,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          showNotification({
            title: 'Error',
            message: 'Failed to update project. Please try again.',
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
            updateProjectMutation.isLoading || updateProjectMutation.isSuccess
          }
        >
          Update
        </Button>
      </Group>
    </form>
  );
}

export default EditProjectForm;
