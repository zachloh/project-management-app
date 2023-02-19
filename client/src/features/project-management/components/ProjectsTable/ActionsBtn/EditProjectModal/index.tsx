import { Modal } from '@mantine/core';
import React from 'react';

import ModalHeader from 'components/ModalHeader';
import { Project } from 'types';

import EditProjectForm from './EditProjectForm';

type EditProjectModalProps = {
  opened: boolean;
  onClose: () => void;
  project: Project;
  orgId: string | undefined;
};

function EditProjectModal({
  opened,
  onClose,
  project,
  orgId,
}: EditProjectModalProps) {
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
        title="Edit Project"
        onClose={onClose}
        ariaLabel="Close edit project modal"
      />
      <EditProjectForm onClose={onClose} project={project} orgId={orgId} />
    </Modal>
  );
}

export default EditProjectModal;
