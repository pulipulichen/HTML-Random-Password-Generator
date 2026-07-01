function init() {
    loadOptions();
    loadHistory();
    setupEventListeners();
    toggleLetterOptions();

    const history = getHistory();
    if (history.length > 0) {
        elements.result.value = history[0].password;
    } else {
        generatePassword();
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }
}

lucide.createIcons();
registerServiceWorker();
window.addEventListener('DOMContentLoaded', () => {
    initI18n();
    init();
});
