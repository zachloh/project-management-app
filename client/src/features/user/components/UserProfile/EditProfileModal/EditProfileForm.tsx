import { Avatar, Button, Center, Group, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';

import { useUpdateUserProfile } from 'api/users/updateUserProfile';
import { User } from 'types';
import { getInitials } from 'utils/getInitials';

type EditProfileFormProps = {
  user: User;
  onClose: () => void;
};

const editProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your first name' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your last name' }),
  position: z.string().trim().min(1, { message: 'Please enter your position' }),
});

function EditProfileForm({ user, onClose }: EditProfileFormProps) {
  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.isDemo ? 'guest@gmail.com' : user.email,
      position: user.position || '',
    },
    validate: zodResolver(editProfileSchema),
  });
  const [initials, setInitials] = useState(
    getInitials(form.values.firstName, form.values.lastName)
  );
  const updateUserProfileMutation = useUpdateUserProfile();

  useEffect(() => {
    setInitials(getInitials(form.values.firstName, form.values.lastName));
  }, [form.values.firstName, form.values.lastName]);

  type FormValues = typeof form.values;

  const handleSubmit = (values: FormValues) => {
    const { firstName, lastName, position } = values;

    updateUserProfileMutation.mutate({
      userId: user._id,
      userData: {
        firstName,
        lastName,
        position,
      },
    });

    onClose();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Center>
          <Avatar color="violet.7" size={80} radius={40}>
            {initials}
          </Avatar>
        </Center>
        <TextInput
          label="First Name"
          withAsterisk
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label="Last Name"
          withAsterisk
          {...form.getInputProps('lastName')}
        />
        <TextInput
          label="Email"
          description="Email is read-only in demo"
          withAsterisk
          readOnly
          disabled
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Position"
          withAsterisk
          {...form.getInputProps('position')}
        />
        <Group position="right" spacing={20} mt={10}>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="filled"
            disabled={!form.isDirty()}
            loading={updateUserProfileMutation.isLoading}
          >
            Update
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default EditProfileForm;
