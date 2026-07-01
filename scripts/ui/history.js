function addHistory(password) {
    let history = getHistory();

    if (history.length > 0 && history[0].password === password) {
        return;
    }

    const now = new Date();
    const timeStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    history.unshift({ password, time: timeStr });

    if (history.length > MAX_HISTORY) {
        history = history.slice(0, MAX_HISTORY);
    }

    saveHistory(history);
    renderHistory(history);
}

function loadHistory() {
    renderHistory(getHistory());
}

function renderHistory(history) {
    elements.historyList.innerHTML = '';

    if (history.length === 0) {
        elements.emptyHistoryMsg.textContent = t('emptyHistory');
        elements.emptyHistoryMsg.style.display = 'block';
        elements.historyList.appendChild(elements.emptyHistoryMsg);
        return;
    }

    elements.emptyHistoryMsg.style.display = 'none';

    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'group flex justify-between items-center p-3 bg-slate-50 hover:bg-blue-50 rounded-lg border border-slate-100 transition-colors fade-in cursor-pointer';

        const safePassword = item.password.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

        div.setAttribute('onclick', `copySpecificPassword('${safePassword}', this.querySelector('.copy-indicator'))`);

        div.innerHTML = `
            <div class="overflow-hidden pr-4 flex-1">
                <p class="font-mono text-slate-800 font-medium truncate tracking-wider">${item.password.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
                <p class="text-xs text-slate-400 mt-1">${item.time}</p>
            </div>
            <div class="flex items-center gap-1 flex-shrink-0">
                <span class="copy-indicator text-slate-400 group-hover:text-blue-600 transition-colors p-2" title="${t('clickToCopy')}">
                    <i data-lucide="copy" class="w-4 h-4"></i>
                </span>
                <button onclick="event.stopPropagation(); deleteHistoryItem(${index})" class="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors p-2" title="${t('deleteHistoryItem')}">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        elements.historyList.appendChild(div);
    });

    lucide.createIcons();
}

function deleteHistoryItem(index) {
    let history = getHistory();
    history.splice(index, 1);
    saveHistory(history);
    renderHistory(history);
}

function clearHistory() {
    if (confirm(t('confirmClearHistory'))) {
        localStorage.removeItem('pwdGenHistory');
        renderHistory([]);
    }
}

onLanguageChange(() => {
    renderHistory(getHistory());
});

function copySpecificPassword(pwd, btnElement) {
    navigator.clipboard.writeText(pwd).then(() => {
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = '<i data-lucide="check" class="w-4 h-4 text-green-500"></i>';
        lucide.createIcons();
        setTimeout(() => {
            btnElement.innerHTML = originalHTML;
            lucide.createIcons();
        }, 2000);
    });
}
