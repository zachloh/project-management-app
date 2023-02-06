import { Modal } from '@mantine/core';
import React from 'react';

import ModalHeader from 'components/ModalHeader';
import { User } from 'types';

import CreateProjectForm from './CreateProjectForm';

type CreateProjectModalProps = {
  opened: boolean;
  onClose: () => void;
  user: User;
};

function CreateProjectModal({
  opened,
  onClose,
  user,
}: CreateProjectModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      transitionDuration={300}
      centered
    >
      <ModalHeader
        title="Create Project"
        onClose={onClose}
        ariaLabel="Close create project modal"
      />
      <CreateProjectForm onClose={onClose} user={user} />
    </Modal>
  );
}

export default CreateProjectModal;
