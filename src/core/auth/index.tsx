import { supabase } from '@/lib/supabase';
import { create } from 'zustand';
import * as WebBrowser from 'expo-web-browser';

import { createSelectors } from '../utils';
import type { TokenType, LoginType, RegisterType } from './utils';
import { getToken, removeToken, setToken } from './utils';
import { Env } from '@env';
import { hydrateAlarms } from '@/core/alarms';
import * as Linking from 'expo-linking';
import { makeRedirectUri } from 'expo-auth-session';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (formData: LoginType) => Promise<{ ok: boolean; message: string }>;
  singUp: (formData: RegisterType) => Promise<{ ok: boolean; message: string }>;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: async (formData) => {
    // https://github.com/supabase/supabase/issues/14769
    // https://github.com/dancrtis/supabase-tailwind-rn/blob/main/components/auth.js
    // https://docs.expo.dev/versions/latest/sdk/auth-session/
    if (formData.provider) {
      try {
        const redirectUri = makeRedirectUri() || 'com.sedenamodena://';
        const response = await WebBrowser.openAuthSessionAsync(
          `${Env.SUPABASE_URL}/auth/v1/authorize?provider=${formData.provider}&redirect_to=${redirectUri}`,
          redirectUri
        );

        if (response.type === 'success') {
          const url = response.url;
          const params = url.split('#')[1];
          const accessToken = params.split('&')[0].split('=')[1];
          const refreshToken = params.split('&')[4].split('=')[1];

          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            return { ok: false, message: error.message };
          }

          const token = {
            access: data.session?.access_token || '',
            refresh: data.session?.refresh_token || '',
            user: data.user?.email || '',
          };

          set({ status: 'signIn', token });
          setToken(token);
          hydrateAlarms();

          return { ok: true, message: 'Login successfully.' };
        }
      } catch (error) {
        return { ok: false, message: error };
      } finally {
        WebBrowser.maybeCompleteAuthSession();
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    const token = {
      user: data.user?.email || '',
    };

    set({ status: 'signIn', token });
    setToken(token);
    hydrateAlarms();

    return { ok: true, message: 'Login successfully.' };
  },
  singUp: async (formData: RegisterType) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      return { ok: false, message: error.message };
    }

    const token = {
      user: data.user?.email || '',
    };

    set({
      status: 'signIn',
      token,
    });
    setToken(token);
    hydrateAlarms();

    return { ok: true, message: 'Account created successfully.' };
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        set({ status: 'signIn', token: userToken });
      } else {
        get().signOut();
      }
    } catch (e) {
      get().signOut();
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
// export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
