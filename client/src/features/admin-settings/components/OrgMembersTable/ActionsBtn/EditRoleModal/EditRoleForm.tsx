import { Accordion, Button, Group, List, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import React from 'react';
import { ExclamationMark } from 'tabler-icons-react';

import { useUpdateUserRole } from 'api/users/updateUserRole';
import { User } from 'types';

type EditRoleFormProps = {
  onClose: () => void;
  member: User<string>;
  orgId: string;
};

function EditRoleForm({ onClose, member, orgId }: EditRoleFormProps) {
  const form = useForm({
    initialValues: {
      role: member.role,
    },
  });

  const updateUserRoleMutation = useUpdateUserRole(orgId);

  type FormValues = typeof form.values;

  const handleSubmit = (values: FormValues) => {
    updateUserRoleMutation.mutate(
      {
        userId: member._id,
        userData: values,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          showNotification({
            title: 'Error',
            message: 'Failed to update role. Please try again.',
            color: 'red',
            icon: <ExclamationMark />,
          });
        },
      }
    );
  };

  return (
    <>
      <Accordion
        variant="contained"
        order={4}
        defaultValue={member.role && [member.role]}
        multiple
        styles={{
          label: {
            fontWeight: 600,
          },
        }}
      >
        <Accordion.Item value="admin">
          <Accordion.Control>Admin</Accordion.Control>
          <Accordion.Panel>
            <Text size={14}>Access to:</Text>
            <List size={14} withPadding>
              <List.Item>Dashboard</List.Item>
              <List.Item>Projects</List.Item>
              <List.Item>Project Management</List.Item>
              <List.Item>Admin Settings</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="project manager">
          <Accordion.Control>Project Manager</Accordion.Control>
          <Accordion.Panel>
            <Text size={14}>Access to:</Text>
            <List size={14} withPadding>
              <List.Item>Dashboard</List.Item>
              <List.Item>Projects</List.Item>
              <List.Item>Project Management</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value="member">
          <Accordion.Control>Member</Accordion.Control>
          <Accordion.Panel>
            <Text size={14}>Access to:</Text>
            <List size={14} withPadding>
              <List.Item>Dashboard</List.Item>
              <List.Item>Projects</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label="Role"
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'project manager', label: 'Project Manager' },
            { value: 'member', label: 'Member' },
          ]}
          mt={20}
          size="md"
          {...form.getInputProps('role')}
        />
        <Group position="right" spacing={20} mt={30}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!form.isDirty()}
            loading={
              updateUserRoleMutation.isLoading ||
              updateUserRoleMutation.isSuccess
            }
          >
            Update
          </Button>
        </Group>
      </form>
    </>
  );
}

export default EditRoleForm;
