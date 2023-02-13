import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useUpdateIssue } from 'api/issues/updateIssue';
import { Issue, User } from 'types';

import AssigneeOptions from './AssigneeOptions';
import DescriptionInput from './DescriptionInput';
import DueDateInput from './DueDateInput';
import IssueDates from './IssueDates';
import styles from './IssueForm.module.css';
import PriorityOptions from './PriorityOptions';
import ReporterOptions from './ReporterOptions';
import StatusOptions from './StatusOptions';
import TitleInput from './TitleInput';
import TypeOptions from './TypeOptions';
import { FormValues } from './types';

type IssueFormProps = {
  issue: Issue;
  onCloseIssueModal: () => void;
  members: User<string>[];
  orgId: string | undefined;
};

function IssueForm({
  issue,
  onCloseIssueModal,
  members,
  orgId,
}: IssueFormProps) {
  const form = useForm<FormValues>({
    initialValues: {
      title: issue.title,
      description: issue.description || '',
      type: issue.type,
      status: issue.status,
      priority: issue.priority,
      assignee: issue.assignee || null,
      reporter: issue.reporter,
      dueDate: issue.dueDate ? new Date(issue.dueDate) : null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Title cannot be empty' : null,
      description: (value) =>
        value && !value.trim()
          ? 'Description cannot contain only blank spaces'
          : null,
    },
  });

  const updateIssueMutation = useUpdateIssue(orgId);

  const handleSubmit = (values: FormValues) => {
    const { description, assignee, dueDate, ...rest } = values;
    const updatedFields = Object.keys(values).filter((value) => {
      if (form.isDirty(value)) {
        return true;
      }
      return false;
    });

    updateIssueMutation.mutate(
      {
        issueId: issue._id,
        issueData: {
          ...rest,
          description: description || undefined,
          assignee: assignee || undefined,
          dueDate: dueDate || undefined,
          updatedFields,
        },
      },
      {
        onSuccess: () => {
          onCloseIssueModal();
        },
      }
    );
  };

  return (
    <form className={styles.container} onSubmit={form.onSubmit(handleSubmit)}>
      <div>
        <TitleInput form={form} />
        <DescriptionInput form={form} />
        <div className={styles.options}>
          <TypeOptions form={form} />
          <StatusOptions form={form} />
          <PriorityOptions form={form} />
        </div>
      </div>
      <div>
        <AssigneeOptions form={form} members={members} />
        <ReporterOptions form={form} members={members} />
        <DueDateInput form={form} />
        <IssueDates
          createdAt={issue.createdAt}
          updatedAt={issue.updatedAt}
          completedAt={issue.completedAt}
        />
      </div>
      <div className={styles.buttons}>
        <Button variant="outline" onClick={onCloseIssueModal}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="filled"
          disabled={!form.isDirty()}
          loading={
            updateIssueMutation.isLoading || updateIssueMutation.isSuccess
          }
        >
          Update
        </Button>
      </div>
    </form>
  );
}

export default IssueForm;
