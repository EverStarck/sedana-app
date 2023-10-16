import React from 'react';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, ScrollView, showErrorMessage, View } from '@/ui';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [type, setType] = React.useState<'login' | 'register' | 'github'>(
    'login'
  );
  const [signIn, signUp] = useAuth((state) => [state.signIn, state.singUp]);

  useSoftKeyboardEffect();

  const onSubmit: LoginFormProps['onSubmit'] = async (data, provider) => {
    console.log(data);
    setIsLoading(true);

    if (data.provider === 'github') {
      const res = await signIn(data);
      setIsLoading(false);

      if (!res.ok) {
        showErrorMessage(res.message);
        return;
      }

      setIsLoading(false);

      return;
    }

    if (type === 'register') {
      const res = await signUp(data);

      setIsLoading(false);

      if (!res.ok) {
        showErrorMessage(res.message);
        return;
      }

      return;
    }

    if (type === 'login') {
      const res = await signIn(data);
      setIsLoading(false);

      if (!res.ok) {
        showErrorMessage(res.message);
        return;
      }
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <FocusAwareStatusBar />
        <LoginForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          type={type}
          setType={setType}
        />
      </View>
    </>
  );
};
