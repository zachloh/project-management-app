import { Modal } from '@mantine/core';
import React from 'react';

import ModalHeader from 'components/ModalHeader';
import { User } from 'types';

import EditProfileForm from './EditProfileForm';

type EditProfileModalProps = {
  opened: boolean;
  onClose: () => void;
  user: User;
};

function EditProfileModal({ opened, onClose, user }: EditProfileModalProps) {
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
        title="Edit Profile"
        onClose={onClose}
        ariaLabel="Close edit profile modal"
      />
      <EditProfileForm user={user} onClose={onClose} />
    </Modal>
  );
}

export default EditProfileModal;
