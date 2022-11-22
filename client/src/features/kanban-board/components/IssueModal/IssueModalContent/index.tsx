import React from 'react';

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
  return (
    <>
      <ModalTitle onCloseModal={onCloseModal} />
      <IssueForm selectedIssue={selectedIssue} onCloseModal={onCloseModal} />
    </>
  );
}

export default IssueModalContent;
