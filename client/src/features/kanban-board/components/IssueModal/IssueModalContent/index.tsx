import React from 'react';

import { useGetIssue } from 'api/issues/getIssue';
import { User } from 'types';

import IssueForm from './IssueForm';
import ModalTitle from './ModalTitle';

type IssueModalContentProps = {
  selectedIssue: string;
  onCloseIssueModal: () => void;
  openDeleteModal: boolean;
  onOpenDeleteModal: () => void;
  onCloseDeleteModal: () => void;
  members: User<string>[];
};

function IssueModalContent({
  selectedIssue,
  onCloseIssueModal,
  openDeleteModal,
  onOpenDeleteModal,
  onCloseDeleteModal,
  members,
}: IssueModalContentProps) {
  const { data: issue, isLoading, isError } = useGetIssue(selectedIssue);

  // TODO: Add skeleton
  if (isLoading) {
    return <div>Loading...</div>;
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
      />
      <IssueForm
        issue={issue}
        onCloseIssueModal={onCloseIssueModal}
        members={members}
      />
    </>
  );
}

export default IssueModalContent;
