import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18n/en.json';
import ru from './i18n/ru.json';
import de from './i18n/de.json';
import es from './i18n/es.json';

const initLang = localStorage.getItem('lang');
const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: `${initLang}`,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
