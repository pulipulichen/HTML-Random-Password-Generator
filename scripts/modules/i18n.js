const TRANSLATIONS = window.I18N_TRANSLATIONS || {};
const STORAGE_KEY = 'pwdGen_language';
const DEFAULT_LANGUAGE = 'en';

let currentLanguage = DEFAULT_LANGUAGE;
const languageChangeListeners = [];

function getSupportedLanguages() {
    return Object.keys(TRANSLATIONS);
}

function resolveLanguage(preferred) {
    if (preferred && TRANSLATIONS[preferred]) {
        return preferred;
    }

    const browserLangs = navigator.languages || [navigator.language];
    for (const lang of browserLangs) {
        if (!lang) continue;
        if (TRANSLATIONS[lang]) return lang;
        const base = lang.split('-')[0];
        const match = Object.keys(TRANSLATIONS).find((key) => key === base || key.startsWith(base + '-'));
        if (match) return match;
    }

    return DEFAULT_LANGUAGE;
}

function t(key) {
    const dict = TRANSLATIONS[currentLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE] || {};
    return dict[key] ?? TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] ?? key;
}

function getCurrentLanguage() {
    return currentLanguage;
}

function updateLanguageSelectOptions() {
    const langSelect = document.getElementById('language-select');
    if (!langSelect) return;

    getSupportedLanguages().forEach((code) => {
        let option = langSelect.querySelector(`option[value="${code}"]`);
        if (!option) {
            option = document.createElement('option');
            option.value = code;
            langSelect.appendChild(option);
        }
        option.textContent = t(`lang_${code}`);
    });
    langSelect.value = currentLanguage;
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.title = t('pageTitle');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        el.textContent = t(el.getAttribute('data-i18n'));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        el.title = t(el.getAttribute('data-i18n-title'));
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.content = t('metaDescription');
    }

    updateLanguageSelectOptions();

    if (typeof updateToggleSeedButton === 'function') {
        updateToggleSeedButton();
    }
}

function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    languageChangeListeners.forEach((fn) => fn(lang));
}

function onLanguageChange(fn) {
    languageChangeListeners.push(fn);
}

function initI18n() {
    const saved = localStorage.getItem(STORAGE_KEY);
    currentLanguage = resolveLanguage(saved);
    applyTranslations();

    const langSelect = document.getElementById('language-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    }
}
