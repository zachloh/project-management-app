import {
  Anchor,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { LoginFormValues } from '../types';
import AuthLayout from './AuthLayout';

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Please enter your email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' })
    .min(1, { message: 'Please enter your password' }),
});

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Email" mb={20} {...form.getInputProps('email')} />
        <PasswordInput label="Password" {...form.getInputProps('password')} />
        <Button type="submit" w="100%" mt={30} size="md" color="violet.5">
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
