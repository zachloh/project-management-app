import React from 'react';

import IssueForm from './IssueForm';
import ModalTitle from './ModalTitle';

type IssueModalContentProps = {
  selectedIssue: string | null;
  onCloseModal: () => void;
};

function IssueModalContent({
  selectedIssue,
  onCloseModal,
}: IssueModalContentProps) {
  return (
    <>
      <ModalTitle onCloseModal={onCloseModal} />
      <IssueForm />
    </>
  );
}

export default IssueModalContent;
