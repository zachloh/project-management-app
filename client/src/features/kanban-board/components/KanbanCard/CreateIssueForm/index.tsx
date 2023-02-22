import { Button, Group, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useClickOutside, useHotkeys, getHotkeyHandler } from '@mantine/hooks';
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
  orgId: string | undefined;
};

function CreateIssueForm({
  onCloseCreateIssueForm,
  status,
  projectId,
  userId,
  orgId,
}: CreateIssueFormProps) {
  const ref = useClickOutside(() => onCloseCreateIssueForm());
  useHotkeys([
    [
      'Escape',
      () => {
        onCloseCreateIssueForm();
      },
    ],
  ]);

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

  const createIssueMutation = useCreateIssue(orgId, () => {
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
          onKeyDown={getHotkeyHandler([
            [
              'Escape',
              () => {
                onCloseCreateIssueForm();
              },
            ],
          ])}
        />
        <Group noWrap spacing={5} className={styles.group}>
          <TypeOptions form={form} />
          <PriorityOptions form={form} />
          {!createIssueMutation.isLoading && (
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
          )}
          <Button
            type="submit"
            variant="subtle"
            px={6}
            ml={!createIssueMutation.isLoading ? 0 : 'auto'}
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
