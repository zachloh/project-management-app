import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import IssueModalContent from './IssueModalContent';

function IssueModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIssue = searchParams.get('selectedIssue');
  const isMobile = useMediaQuery('(max-width: 425px)');

  const closeModal = () => {
    setSearchParams();
  };

  return (
    <Modal
      opened={!!searchParams.get('selectedIssue')}
      onClose={closeModal}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      fullScreen={isMobile}
      size={1000}
    >
      {selectedIssue && (
        <IssueModalContent
          selectedIssue={selectedIssue}
          onCloseModal={closeModal}
        />
      )}
    </Modal>
  );
}

export default IssueModal;
