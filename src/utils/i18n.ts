import type { GetStaticPaths } from 'astro';

// Import all translation files
import commonEn from '../i18n/en/common.json';
import commonEs from '../i18n/es/common.json';
import commonCa from '../i18n/ca/common.json';

import homeEn from '../i18n/en/home.json';
import homeEs from '../i18n/es/home.json';
import homeCa from '../i18n/ca/home.json';

import projectsEn from '../i18n/en/projects.json';
import projectsEs from '../i18n/es/projects.json';
import projectsCa from '../i18n/ca/projects.json';

// Skills are in home.json, no separate files needed

export const languages = {
  en: 'English',
  es: 'Español', 
  ca: 'Català'
};

export const defaultLang = 'en';

// Combine all translations by language
export const translations = {
  en: {
    common: commonEn,
    home: homeEn,
    projects: projectsEn
  },
  es: {
    common: commonEs,
    home: homeEs,
    projects: projectsEs
  },
  ca: {
    common: commonCa,
    home: homeCa,
    projects: projectsCa
  }
} as const;

export type Lang = keyof typeof translations;
export type TranslationNamespace = keyof typeof translations['en'];

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  // Si la URL es '/' o no tiene idioma, es inglés
  if (!lang || lang === '') return defaultLang;
  if (lang in translations) return lang as Lang;
  return defaultLang;
}

// Get nested value from object using dot notation
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// Interpolate variables in string
function interpolate(template: string, variables: Record<string, any> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

export function useTranslations(lang: Lang) {
  const langTranslations = translations[lang] || translations[defaultLang];
  
  return function t(key: string, variables?: Record<string, any>): string {
    // Split namespace and key (e.g., "common.nav.about" -> ["common", "nav.about"])
    const [namespace, ...keyParts] = key.split('.');
    const keyPath = keyParts.join('.');
    
    if (!namespace || !keyPath) {
      return key; // Return original key if format is invalid
    }
    
    const namespaceTranslations = langTranslations[namespace as TranslationNamespace];
    if (!namespaceTranslations) {
      return key; // Return original key if namespace doesn't exist
    }
    
    const translation = getNestedValue(namespaceTranslations, keyPath);
    
    // Apply interpolation if variables provided
    if (variables) {
      return interpolate(translation, variables);
    }
    
    return translation;
  }
}

export function getRouteFromUrl(url: URL): string {
  const pathname = url.pathname;
  const parts = pathname?.split('/');
  const maybeLocale = parts[1];
  
  // Solo remover el prefijo si es 'es' o 'ca' (no 'en')
  if (maybeLocale && (maybeLocale === 'es' || maybeLocale === 'ca')) {
    return parts.slice(2).join('/') || '/';
  }
  return pathname;
}

export function getStaticPaths() {
  return Object.keys(languages).map((lang) => ({
    params: { lang }
  }));
}

// Helper to get all translations for a specific namespace
export function useNamespaceTranslations(lang: Lang, namespace: TranslationNamespace) {
  const langTranslations = translations[lang] || translations[defaultLang];
  return langTranslations[namespace];
}