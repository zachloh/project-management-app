import {
  Anchor,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from './AuthLayout';

export function RegisterForm() {
  return (
    <AuthLayout title="Sign Up">
      <form>
        <TextInput label="First Name" mb={20} />
        <TextInput label="Last Name" mb={20} />
        <TextInput label="Email" mb={20} />
        <PasswordInput
          label="Password"
          description="Password must contain at least 6 characters"
        />
        <Button w="100%" mt={30} size="md" color="violet.5">
          Sign Up
        </Button>
      </form>
      <Divider my={30} />
      <Text color="gray.7" align="center">
        Already have an account?
      </Text>
      <Anchor
        component={Link}
        to="/login"
        sx={{ display: 'block' }}
        align="center"
      >
        Sign in
      </Anchor>
    </AuthLayout>
  );
}
