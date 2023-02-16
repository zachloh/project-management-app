import React from 'react';

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
};

function IssueModalContent({
  selectedIssue,
  onCloseIssueModal,
  openDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  members,
  orgId,
}: IssueModalContentProps) {
  const { data: issue, isLoading, isError } = useGetIssue(selectedIssue);

  if (isLoading) {
    return <IssueModalSkeleton />;
  }

  // TODO: Show error when no issue found
  if (isError) {
    return <div>Error...</div>;
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
