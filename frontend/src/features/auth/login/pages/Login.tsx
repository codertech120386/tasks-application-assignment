import { Flex, PasswordInput, Text, TextInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';

import { theme } from '../../../../utils/theme';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useRegisterStyles } from '../../register/register.styles';
import { LoginRequest } from '../login.interfaces';
import Button from '../../../../ui/button/Button';
import { LoginAction } from '../login.action';
import { lengthValidator } from '../../../../utils/components';

export const Login = () => {
  const { classes } = useRegisterStyles();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.register);

  const handleSubmit = (values: LoginRequest) => {
    const payload: LoginRequest = {
      email: values.email,
      password: values.password,
    };
    dispatch(LoginAction(payload));
    navigate('/tasks');
  };

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email',
      password: (value) =>
        lengthValidator(value, 5, 20, 'Invalid email or password'),
    },
  });

  return (
    <Flex justify={'center'} align={'center'} h={'100vh'}>
      <div
        style={{
          width: rem(400),
          borderBottom: `${rem(1)} solid ${theme.colors.gray[4]}`,
        }}
      >
        <div>
          <Text className={classes.welcomeText}>Welcome Back!</Text>
          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            style={{ width: '100%' }}
          >
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

            <Button value='Login' disabled={isLoading} size='100%' />

            <Text className={classes.backToLoginText}>
              Go back to{' '}
              <span
                className='text-blue-600'
                onClick={() => navigate('/register')}
              >
                Register Page
              </span>
            </Text>
          </form>
        </div>
      </div>
    </Flex>
  );
};
