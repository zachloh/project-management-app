import { Button, Card, Group, Stepper } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateProject } from 'api/projects/createProject';
import { useUpdateUserOrg } from 'api/users/updateUserOrg';
import { WelcomeFormValues } from 'features/user/types';
import { User } from 'types';

import CreateOrgForm from './CreateOrgForm';
import CreateProjectForm from './CreateProjectForm';
import FormTitles from './FormTitles';
import styles from './WelcomeForm.module.css';

type WelcomeFormProps = {
  user: User;
};

function WelcomeForm({ user }: WelcomeFormProps) {
  const navigate = useNavigate();
  const [active, setActive] = useState(() => {
    if (user.org) {
      return 1;
    }
    return 0;
  });

  const updateUserOrgMutation = useUpdateUserOrg();
  const createProjectMutation = useCreateProject();

  const form = useForm<WelcomeFormValues>({
    initialValues: {
      organization: '',
      position: '',
      role: 'admin',
      name: '',
      description: '',
      category: 'business',
    },
    validate: (values) => {
      if (active === 0) {
        return {
          organization:
            values.organization.trim().length < 1
              ? 'Please enter your organization'
              : null,
          position:
            values.position.trim().length < 1
              ? 'Please enter your position'
              : null,
        };
      }
      return {
        name:
          values.name.trim().length < 1
            ? 'Please enter your project name'
            : null,
        description:
          values.description.trim().length < 1
            ? 'Please enter your project description'
            : null,
      };
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validate();
    const { organization, position, role, name, description, category } =
      form.values;
    if (form.isValid()) {
      if (active === 0) {
        updateUserOrgMutation.mutate(
          {
            userId: user?._id,
            userData: {
              org: organization,
              position,
              role,
            },
          },
          {
            onSuccess: () => {
              setActive((current) => current + 1);
            },
          }
        );
        return;
      }
      createProjectMutation.mutate(
        {
          name,
          description,
          category,
          orgId: user.org?._id,
          userId: user._id,
        },
        {
          onSuccess: () => {
            navigate('/dashboard', { replace: true });
          },
        }
      );
    }
  };

  return (
    <Card
      shadow="sm"
      py={30}
      px={40}
      radius="md"
      withBorder
      className={styles.card}
    >
      <FormTitles active={active} />
      <Stepper size="md" active={active} breakpoint={580}>
        <Stepper.Step
          label="Step 1"
          description="Organization settings"
          loading={updateUserOrgMutation.isLoading}
        >
          <CreateOrgForm form={form} handleSubmit={handleSubmit} />
        </Stepper.Step>
        <Stepper.Step
          label="Step 2"
          description="Project settings"
          loading={createProjectMutation.isLoading}
        >
          <CreateProjectForm form={form} handleSubmit={handleSubmit} />
        </Stepper.Step>
      </Stepper>
      <Group position="right" mt="xl">
        {active === 0 && (
          <Button
            type="submit"
            form="create-org-form"
            size="md"
            loading={updateUserOrgMutation.isLoading}
          >
            Create Organization
          </Button>
        )}
        {active === 1 && (
          <Button
            type="submit"
            form="create-project-form"
            size="md"
            loading={
              createProjectMutation.isLoading || createProjectMutation.isSuccess
            }
          >
            Create Project
          </Button>
        )}
      </Group>
    </Card>
  );
}

export default WelcomeForm;
