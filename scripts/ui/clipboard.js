function copyPassword() {
    const pwd = elements.result.value;
    if (!pwd) return;

    navigator.clipboard.writeText(pwd).then(() => {
        const iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-6 h-6 text-green-500"><path d="M20 6 9 17l-5-5"/></svg>';
        elements.copyBtn.innerHTML = iconSvg;

        setTimeout(() => {
            elements.copyBtn.innerHTML = '<i data-lucide="copy" class="w-6 h-6" id="copyIcon"></i>';
            lucide.createIcons();
        }, 2000);
    }).catch(() => {
        elements.result.select();
        document.execCommand('copy');
    });
}
