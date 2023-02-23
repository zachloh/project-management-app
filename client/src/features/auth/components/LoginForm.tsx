import {
  Alert,
  Anchor,
  Button,
  CloseButton,
  Divider,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircle, ExclamationMark } from 'tabler-icons-react';
import { z } from 'zod';

import { useAuth } from 'api/auth';

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
  const { login, isLoggingIn, loginAsGuest, isLoggingInAsGuest } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(loginSchema),
  });
  const [showFormError, setShowFormError] = useState(false);

  const handleSubmit = (values: LoginFormValues) => {
    login(values, {
      onSuccess: () => {
        const state = location.state as { path: string };
        navigate(state?.path || '/dashboard', { replace: true });
      },
      onError: (err) => {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setShowFormError(true);
            return;
          }
        }
        showNotification({
          title: 'Server Error',
          message: 'Please try again later',
          color: 'red',
          icon: <ExclamationMark />,
        });
      },
    });
  };

  const handleLoginAsGuest = () => {
    loginAsGuest(undefined, {
      onSuccess: () => {
        navigate('/dashboard', { replace: true });
      },
      onError: () => {
        showNotification({
          title: 'Server Error',
          message: 'Please try again later',
          color: 'red',
          icon: <ExclamationMark />,
        });
      },
    });
  };

  return (
    <AuthLayout title="Sign In">
      <Button
        size="md"
        color="violet.6"
        variant="outline"
        onClick={handleLoginAsGuest}
        loading={isLoggingInAsGuest}
      >
        Sign In as Guest
      </Button>
      <Divider
        my={20}
        label={
          <Text size={14} color="dark.3">
            or
          </Text>
        }
        labelPosition="center"
      />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {showFormError && (
          <Alert
            color="red"
            icon={<AlertCircle color="#E03131" />}
            mb={20}
            styles={{
              wrapper: {
                alignItems: 'center',
              },
            }}
          >
            <Group noWrap>
              <Text color="red.9">Incorrect email or password</Text>
              <CloseButton
                color="red.9"
                ml="auto"
                aria-label="Close alert"
                onClick={() => setShowFormError(false)}
              />
            </Group>
          </Alert>
        )}
        <TextInput label="Email" mb={20} {...form.getInputProps('email')} />
        <PasswordInput label="Password" {...form.getInputProps('password')} />
        <Button
          type="submit"
          loading={isLoggingIn}
          w="100%"
          mt={30}
          size="md"
          color="violet.5"
        >
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
