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

export function LoginForm() {
  return (
    <AuthLayout title="Sign In">
      <form>
        <TextInput label="Email" mb={20} />
        <PasswordInput label="Password" />
        <Button w="100%" mt={30} size="md" color="violet.5">
          Sign In
        </Button>
      </form>
      <Divider my={30} />
      <Text color="gray.7" align="center">
        Don&apos;t have an account?
      </Text>
      <Anchor
        component={Link}
        to="/register"
        sx={{ display: 'block' }}
        align="center"
      >
        Sign up
      </Anchor>
    </AuthLayout>
  );
}
