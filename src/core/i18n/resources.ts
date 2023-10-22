import es from '@/translations/es.json';
import en from '@/translations/en.json';

export const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

export type Language = keyof typeof resources;
