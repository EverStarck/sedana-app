import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';

export type TokenType = {
  user: string;
};

export type LoginType = RegisterType & {
  provider?: 'github';
};

export type RegisterType = {
  email: string;
  password: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
