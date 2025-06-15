import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './locales/en/translation.json'
import urTranslation from './locales/ur/translation.json'

export const resources = {
  en: { translation: enTranslation },
  ur: { translation: urTranslation },
} as const

i18n
  .use(LanguageDetector) // Detect language
  .use(initReactI18next) // Pass to react-i18next
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: false, // Set true for development to see logs
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
