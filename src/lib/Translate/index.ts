import i18n from 'i18n-js';
import en from './locales/en';
import kr from './locales/kr';
import cn from './locales/cn';
import jp from './locales/jp';

export const getUserLanguage = (): string => {
    const language = localStorage.getItem('selectedLanguage');

    if (language) return language;

    const browserLanguage = (navigator.languages && navigator.languages[0])
        || navigator.language;

    if (browserLanguage) {
        if (browserLanguage.indexOf('en') === 0) return 'en';
        if (browserLanguage.indexOf('cn') === 0) return 'cn';
        if (browserLanguage.indexOf('jp') === 0) return 'jp';
        if (browserLanguage.indexOf('kr') === 0) return 'jp';
    }

    // fallback to en
    return 'en';
};

export const setUserLanguage = async (language: string): Promise<void> => {
    localStorage.setItem('selectedLanguage', language);

    i18n.locale = language;
    i18n.translations = {
        en,
        cn,
        jp,
        kr,

    };
};

const currentLanguage = getUserLanguage();
setUserLanguage(currentLanguage);

i18n.fallbacks = true;

export default i18n;
