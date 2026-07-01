function saveOptions() {
    let lengthVal = '12';
    for (const radio of elements.lengthRadios) {
        if (radio.checked) { lengthVal = radio.value; break; }
    }

    let letterTypeVal = 'standard';
    for (const radio of elements.letterTypeRadios) {
        if (radio.checked) { letterTypeVal = radio.value; break; }
    }

    const options = {
        length: lengthVal,
        customLength: elements.customLengthInput.value,
        useLetters: elements.useLetters.checked,
        letterType: letterTypeVal,
        useNumbers: elements.useNumbers.checked,
        useSpecial: elements.useSpecial.checked,
        specialChars: elements.specialCharsInput.value,
        seedWord: elements.seedInput.value
    };
    localStorage.setItem('pwdGenOptions', JSON.stringify(options));
}

function loadOptions() {
    const saved = localStorage.getItem('pwdGenOptions');
    if (saved) {
        try {
            const options = JSON.parse(saved);

            elements.lengthRadios.forEach(radio => {
                radio.checked = (radio.value === options.length);
            });
            elements.customLengthInput.value = options.customLength || '20';
            elements.customLengthInput.disabled = (options.length !== 'custom');

            elements.useLetters.checked = options.useLetters;
            elements.letterTypeRadios.forEach(radio => {
                radio.checked = (radio.value === options.letterType);
            });
            elements.useNumbers.checked = options.useNumbers;
            elements.useSpecial.checked = options.useSpecial;

            elements.specialCharsInput.value = options.specialChars || CHAR_SETS.defaultSpecial;
            elements.seedInput.value = options.seedWord || generateDefaultSeed();

        } catch (e) {
            console.error('載入設定失敗', e);
            setDefaultOptions();
        }
    } else {
        setDefaultOptions();
    }
}

function setDefaultOptions() {
    document.querySelector('input[name="length"][value="12"]').checked = true;
    elements.useLetters.checked = true;
    document.querySelector('input[name="letterType"][value="standard"]').checked = true;
    elements.useNumbers.checked = true;
    elements.useSpecial.checked = true;
    elements.specialCharsInput.value = CHAR_SETS.defaultSpecial;
    elements.seedInput.value = generateDefaultSeed();
}

function generateDefaultSeed() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let seed = '';
    for (let i = 0; i < 8; i++) seed += chars.charAt(Math.floor(Math.random() * chars.length));
    return seed;
}

function getHistory() {
    const saved = localStorage.getItem('pwdGenHistory');
    if (saved) {
        try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
}

function saveHistory(history) {
    localStorage.setItem('pwdGenHistory', JSON.stringify(history));
}
