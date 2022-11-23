import React from 'react';

import { useGetIssue } from 'api/getIssue';

import IssueForm from './IssueForm';
import ModalTitle from './ModalTitle';

type IssueModalContentProps = {
  selectedIssue: string;
  onCloseModal: () => void;
};

function IssueModalContent({
  selectedIssue,
  onCloseModal,
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
      <ModalTitle onCloseModal={onCloseModal} />
      <IssueForm issue={issue} onCloseModal={onCloseModal} />
    </>
  );
}

export default IssueModalContent;
