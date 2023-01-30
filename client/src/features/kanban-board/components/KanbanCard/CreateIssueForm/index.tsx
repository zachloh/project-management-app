import { Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useClickOutside } from '@mantine/hooks';
import React from 'react';

import { useCreateIssue } from 'api/issues/createIssue';
import { Issue } from 'types';

import styles from './CreateIssueForm.module.css';
import PriorityOptions from './PriorityOptions';
import TypeOptions from './TypeOptions';
import { CreateIssueFormValues } from './types';

type CreateIssueFormProps = {
  onCloseCreateIssueForm: () => void;
  status: Issue['status'];
  projectId: string;
  userId: string;
};

function CreateIssueForm({
  onCloseCreateIssueForm,
  status,
  projectId,
  userId,
}: CreateIssueFormProps) {
  const ref = useClickOutside(() => onCloseCreateIssueForm());

  const form = useForm<CreateIssueFormValues>({
    initialValues: {
      title: '',
      type: 'task',
      priority: 'high',
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? '*Title cannot be empty' : null,
    },
  });

  const createIssueMutation = useCreateIssue(() => {
    onCloseCreateIssueForm();
  });

  const handleSubmit = (values: CreateIssueFormValues) => {
    createIssueMutation.mutate({
      ...values,
      status,
      project: projectId,
      reporter: userId,
    });
  };

  return (
    <div ref={ref} className={styles.container}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          placeholder="What needs to be done?"
          variant="unstyled"
          minRows={2}
          maxRows={2}
          {...form.getInputProps('title')}
          styles={(theme) => ({
            invalid: {
              '&::placeholder': {
                color: theme.colors.gray[5],
              },
            },
            error: {
              marginBottom: 10,
            },
          })}
          autoFocus
          aria-label="Textarea for issue title"
        />
        <Group noWrap spacing={5}>
          <TypeOptions form={form} />
          <PriorityOptions form={form} />
          <Button
            type="button"
            variant="subtle"
            px={6}
            ml="auto"
            color="gray"
            styles={{
              root: {
                height: 28,
              },
            }}
            onClick={onCloseCreateIssueForm}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="subtle"
            px={6}
            loading={createIssueMutation.isLoading}
            styles={{
              root: {
                height: 28,
              },
            }}
          >
            Create
          </Button>
        </Group>
      </form>
    </div>
  );
}

export default CreateIssueForm;
