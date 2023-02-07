import { Modal } from '@mantine/core';
import React from 'react';

import ModalHeader from 'components/ModalHeader';
import { User } from 'types';

import EditRoleForm from './EditRoleForm';

type EditRoleModalProps = {
  opened: boolean;
  onClose: () => void;
  member: User<string>;
  orgId: string;
};

function EditRoleModal({ opened, onClose, member, orgId }: EditRoleModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      overlayOpacity={0.5}
      shadow="xs"
      withCloseButton={false}
      transitionDuration={300}
      centered
      size={550}
    >
      <ModalHeader
        title="Edit Role"
        onClose={onClose}
        ariaLabel="Close edit role modal"
      />
      <EditRoleForm onClose={onClose} member={member} orgId={orgId} />
    </Modal>
  );
}

export default EditRoleModal;
