

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en';
import vi from '@/locales/vi';
import { EUSerLanguage } from '@/utils/constants/enums';

export const defaultNS = 'common';

export const resources = {
  en,
  vi
};

i18n.use(initReactI18next).init({
  lng: EUSerLanguage.EN,
  fallbackLng: EUSerLanguage.EN,
  interpolation: {
    escapeValue: false
  },
  resources,
  defaultNS
});

export default i18n;