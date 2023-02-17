import { showNotification } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { ExclamationMark } from 'tabler-icons-react';

import { useGetIssue } from 'api/issues/getIssue';
import { User } from 'types';

import IssueForm from './IssueForm';
import IssueModalSkeleton from './IssueModalSkeleton';
import ModalTitle from './ModalTitle';

type IssueModalContentProps = {
  selectedIssue: string;
  onCloseIssueModal: () => void;
  openDeleteModal: boolean;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  members: User<string>[];
  orgId: string | undefined;
  projectId: string;
};

function IssueModalContent({
  selectedIssue,
  onCloseIssueModal,
  openDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  members,
  orgId,
  projectId,
}: IssueModalContentProps) {
  const {
    data: issue,
    isLoading,
    isError,
  } = useGetIssue(selectedIssue, projectId);

  useEffect(() => {
    if (isError) {
      showNotification({
        title: 'Unable to load issue',
        message: '',
        color: 'red',
        icon: <ExclamationMark />,
      });
      onCloseIssueModal();
    }
  }, [isError, onCloseIssueModal]);

  if (isLoading || isError) {
    return <IssueModalSkeleton />;
  }

  return (
    <>
      <ModalTitle
        onCloseIssueModal={onCloseIssueModal}
        openDeleteModal={openDeleteModal}
        onOpenDeleteModal={onOpenDeleteModal}
        onCloseDeleteModal={onCloseDeleteModal}
        issue={issue}
        orgId={orgId}
      />
      <IssueForm
        issue={issue}
        onCloseIssueModal={onCloseIssueModal}
        members={members}
        orgId={orgId}
      />
    </>
  );
}

export default IssueModalContent;
