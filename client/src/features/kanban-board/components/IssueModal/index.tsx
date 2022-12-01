import { Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import IssueModalContent from './IssueModalContent';

function IssueModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIssue = searchParams.get('selectedIssue');
  const isMobile = useMediaQuery('(max-width: 425px)');
  const isLaptop = useMediaQuery('(min-width: 768px)');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const onCloseIssueModal = () => {
    setSearchParams();
  };

  return (
    <Modal
      opened={!!searchParams.get('selectedIssue')}
      onClose={onCloseIssueModal}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      fullScreen={isMobile}
      size={isLaptop ? 800 : 400}
      transitionDuration={300}
      exitTransitionDuration={isMobile ? 300 : 0}
      closeOnEscape={!openDeleteModal}
    >
      {selectedIssue && (
        <IssueModalContent
          selectedIssue={selectedIssue}
          onCloseIssueModal={onCloseIssueModal}
          openDeleteModal={openDeleteModal}
          onOpenDeleteModal={onOpenDeleteModal}
          onCloseDeleteModal={onCloseDeleteModal}
        />
      )}
    </Modal>
  );
}

export default IssueModal;
