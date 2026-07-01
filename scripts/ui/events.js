function setupEventListeners() {
    elements.lengthRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            elements.customLengthInput.disabled = (radio.value !== 'custom');
            if (radio.value === 'custom') elements.customLengthInput.focus();
            saveOptions();
        });
    });

    elements.customLengthInput.addEventListener('input', saveOptions);

    elements.useLetters.addEventListener('change', () => {
        toggleLetterOptions();
        saveOptions();
    });

    elements.letterTypeRadios.forEach(r => r.addEventListener('change', saveOptions));
    elements.useNumbers.addEventListener('change', saveOptions);
    elements.useSpecial.addEventListener('change', saveOptions);

    elements.specialCharsInput.addEventListener('input', () => {
        saveOptions();
        if (elements.targetInput.value.trim() !== '') generatePassword();
    });

    elements.seedInput.addEventListener('input', () => {
        saveOptions();
        if (elements.targetInput.value.trim() !== '') generatePassword();
    });
    elements.targetInput.addEventListener('input', generatePassword);

    elements.toggleSeedBtn.addEventListener('click', () => {
        if (elements.seedInput.type === 'password') {
            elements.seedInput.type = 'text';
        } else {
            elements.seedInput.type = 'password';
        }
        updateToggleSeedButton();
    });
}

function updateToggleSeedButton() {
    const isHidden = elements.seedInput.type === 'password';
    const icon = isHidden ? 'eye' : 'eye-off';
    const labelKey = isHidden ? 'showSeed' : 'hideSeed';
    elements.toggleSeedBtn.innerHTML = `<i data-lucide="${icon}" class="w-3 h-3"></i> <span>${t(labelKey)}</span>`;
    lucide.createIcons();
}

function toggleLetterOptions() {
    if (elements.useLetters.checked) {
        elements.letterOptions.classList.remove('opacity-50', 'pointer-events-none');
    } else {
        elements.letterOptions.classList.add('opacity-50', 'pointer-events-none');
    }
}
