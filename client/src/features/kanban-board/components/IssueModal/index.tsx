import { Box, Modal } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { User } from 'types';

import styles from './IssueModal.module.css';
import IssueModalContent from './IssueModalContent';

type IssueModalProps = {
  members: User<string>[];
  orgId: string | undefined;
  projectId: string;
};

function IssueModal({ members, orgId, projectId }: IssueModalProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedIssue = searchParams.get('selectedIssue');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const onOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const onCloseIssueModal = useCallback(() => {
    setSearchParams();
  }, [setSearchParams]);

  return (
    <Modal
      opened={!!searchParams.get('selectedIssue')}
      onClose={onCloseIssueModal}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      transitionDuration={300}
      exitTransitionDuration={100}
      closeOnEscape={!openDeleteModal}
      centered
      classNames={{ modal: styles.modal }}
    >
      {selectedIssue ? (
        <IssueModalContent
          selectedIssue={selectedIssue}
          onCloseIssueModal={onCloseIssueModal}
          openDeleteModal={openDeleteModal}
          onOpenDeleteModal={onOpenDeleteModal}
          onCloseDeleteModal={onCloseDeleteModal}
          members={members}
          orgId={orgId}
          projectId={projectId}
        />
      ) : (
        <Box className={styles.box} />
      )}
    </Modal>
  );
}

export default IssueModal;
