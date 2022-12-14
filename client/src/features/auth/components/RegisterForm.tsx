import {
  Anchor,
  Box,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'tabler-icons-react';
import { z } from 'zod';

import { RegisterFormValues } from '../types';
import AuthLayout from './AuthLayout';

const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your first name' }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Please enter your last name' }),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Please enter your email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must contain at least 6 characters' }),
});

export function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validate: zodResolver(registerSchema),
    validateInputOnChange: ['password'],
  });

  const handleSubmit = (values: RegisterFormValues) => {
    console.log(values);
  };

  return (
    <AuthLayout title="Sign Up">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="First Name"
          mb={20}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          label="Last Name"
          mb={20}
          {...form.getInputProps('lastName')}
        />
        <TextInput label="Email" mb={20} {...form.getInputProps('email')} />
        <PasswordInput
          label="Password"
          description={
            form.errors.password || form.isValid('password')
              ? null
              : 'Password must contain at least 6 characters'
          }
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          styles={{
            error: {
              marginTop: 5,
            },
          }}
          {...form.getInputProps('password')}
        />
        {form.isValid('password') && (
          <Text
            size={12}
            color="teal.9"
            mt={5}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Check size={14} />
            <Box ml={5}>Password must contain at least 6 characters</Box>
          </Text>
        )}
        <Button type="submit" w="100%" mt={30} size="md" color="violet.5">
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
