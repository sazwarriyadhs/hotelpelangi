'use client';
import { useSettings } from './use-settings';
import id from '../../messages/id.json';
import en from '../../messages/en.json';

const translations = { id, en };

// Simple key-path getter
function get(obj: any, path: string) {      
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
        result = result?.[key];
        if (result === undefined) {
            // Fallback to English if key not found in current locale
            const enResult = getEnglishTranslation(path);
            return enResult !== path ? enResult : path;
        }
    }
    return result;
}

function getEnglishTranslation(path: string) {
    const keys = path.split('.');
    let result = translations.en;
    for (const key of keys) {
        result = result?.[key];
        if (result === undefined) {
            return path;
        }
    }
    return result;
}

export function useTranslation() {
    const { locale } = useSettings();
    const t = (key: string): string => {
        if (!key) return '';
        const selectedTranslations = translations[locale] || translations.id;
        return get(selectedTranslations, key);
    };
    return { t, locale };
}
