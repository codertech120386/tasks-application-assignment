import React from 'react';
import { Flex, PasswordInput, Text, TextInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';

import { theme } from '../../../../utils/theme';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useRegisterStyles } from '../register.styles';
import { RegisterRequest } from '../register.interfaces';
import Button from '../../../../ui/button/Button';
import { RegisterAction } from '../register.action';
import { errorNotification } from '../../../../utils/components';
import { lengthValidator } from '../../../../utils/components';

export const Register = () => {
  const { classes } = useRegisterStyles();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const handleSubmit = (values: RegisterRequest) => {
    const { name, email, password, confirm_password } = values;

    if (password !== confirm_password) {
      errorNotification('Password and Confirm Password should match');
    }

    const payload: RegisterRequest = {
      name,
      email,
      password,
      confirm_password,
    };
    dispatch(RegisterAction(payload));
    navigate('/tasks');
  };

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validate: {
      name: (value) => lengthValidator(value, 2, 50, 'Name'),
      password: (value) => lengthValidator(value, 5, 20, 'Password'),
      confirm_password: (value) =>
        lengthValidator(value, 5, 20, 'Confirm Password'),
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email',
    },
  });

  return (
    <Flex justify={'center'} align={'center'} h={'100vh'}>
      <div
        style={{
          width: '50%',
          borderBottom: `${rem(1)} solid ${theme.colors.gray[4]}`,
        }}
      >
        <div>
          <Text className={classes.welcomeText}>Welcome!</Text>
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{ width: '100%' }}
          >
            <TextInput
              placeholder='Enter Name'
              label='Name'
              {...form.getInputProps('name')}
              mb={15}
              size='md'
            />

            <TextInput
              placeholder='Enter Email'
              label='Email'
              {...form.getInputProps('email')}
              mb={15}
              size='md'
            />

            <PasswordInput
              placeholder='Enter Password'
              label='Password'
              {...form.getInputProps('password')}
              mb={15}
              size='md'
            />

            <PasswordInput
              placeholder='Enter Confirm Password'
              label='Confirm Password'
              {...form.getInputProps('confirm_password')}
              mb={15}
              size='md'
            />

            <Button value='Create Account' disabled={isLoading} size='100%' />

            <Text className={classes.backToLoginText}>
              Go back to{' '}
              <span
                className='text-blue-600'
                onClick={() => navigate('/login')}
              >
                Login Page
              </span>
            </Text>
          </form>
        </div>
      </div>
    </Flex>
  );
};
