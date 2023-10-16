import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';
import { Title } from '../style/title';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema> & {
  provider: 'github';
};

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading: boolean;
  type: 'login' | 'register' | 'github';
  setType: React.Dispatch<
    React.SetStateAction<'login' | 'register' | 'github'>
  >;
};

export const LoginForm = ({
  onSubmit = () => {},
  isLoading,
  type,
  setType,
}: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="flex-1 justify-center p-4">
      <Text testID="form-title" variant="h1" className="pb-6 text-center">
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </Text>

      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />

      <Button
        testID="login-button"
        label={type === 'login' ? 'Login' : 'Register'}
        onPress={handleSubmit(onSubmit)}
        variant="secondary"
        loading={isLoading}
      />

      {type === 'login' ? (
        <Button
          testID="toggle-button"
          label="Not a member? Sign up"
          onPress={() => setType('register')}
          loading={isLoading}
        />
      ) : (
        <Button
          testID="toggle-button"
          label="Already a member? Sign in"
          onPress={() => setType('login')}
          loading={isLoading}
        />
      )}

      <Title text="Other Options" />
      <Button
        testID="toggle-button"
        label="Github"
        onPress={() => {
          setType('github');
          onSubmit({
            email: '',
            password: '',
            provider: 'github',
          });
        }}
        loading={isLoading}
      />
    </View>
  );
};
