import i18n from 'i18next'
import {initReactI18next} from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import vietnameseTranslation from '~/locales/vi.json';
import englishTranslation from '~/locales/en.json';

i18n
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        resources: {
            en: {translation: englishTranslation},
            vi: {translation: vietnameseTranslation}
        },
        fallbackLng: 'vi',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n;