function getSelectedLength() {
    let length = 12;
    for (const radio of elements.lengthRadios) {
        if (radio.checked) {
            if (radio.value === 'custom') {
                length = parseInt(elements.customLengthInput.value, 10);
                if (isNaN(length) || length < 1) length = 12;
            } else {
                length = parseInt(radio.value, 10);
            }
            break;
        }
    }
    return length;
}

function generatePassword() {
    elements.errorMsg.classList.add('hidden');

    const isUseLetters = elements.useLetters.checked;
    const isUseNumbers = elements.useNumbers.checked;
    const isUseSpecial = elements.useSpecial.checked;

    if (!isUseLetters && !isUseNumbers && !isUseSpecial) {
        elements.errorMsg.classList.remove('hidden');
        return;
    }

    const seedWord = elements.seedInput.value || '';
    const targetWord = elements.targetInput.value.trim();
    const targetLength = getSelectedLength();

    let letterType = 'standard';
    for (const radio of elements.letterTypeRadios) {
        if (radio.checked) { letterType = radio.value; break; }
    }

    let customSpecialChars = elements.specialCharsInput.value;
    if (customSpecialChars === '') {
        customSpecialChars = CHAR_SETS.defaultSpecial;
    }

    let randFunc = Math.random;
    if (targetWord !== '') {
        const configStr = `${seedWord}|${targetWord}|${targetLength}|${isUseLetters}|${letterType}|${isUseNumbers}|${isUseSpecial}|${customSpecialChars}`;
        const seedHash = xmur3(configStr)();
        randFunc = mulberry32(seedHash);
    }

    let pool = '';
    let requiredChars = [];

    if (isUseLetters) {
        if (letterType === 'standard') {
            pool += CHAR_SETS.standardLower + CHAR_SETS.standardUpper;
            requiredChars.push(getRandomChar(CHAR_SETS.standardLower, randFunc));
            requiredChars.push(getRandomChar(CHAR_SETS.standardUpper, randFunc));
        } else {
            pool += CHAR_SETS.easyLower + CHAR_SETS.easyUpper;
            requiredChars.push(getRandomChar(CHAR_SETS.easyLower, randFunc));
            requiredChars.push(getRandomChar(CHAR_SETS.easyUpper, randFunc));
        }
    }

    if (isUseNumbers) {
        pool += CHAR_SETS.numbers;
        requiredChars.push(getRandomChar(CHAR_SETS.numbers, randFunc));
    }

    if (isUseSpecial) {
        pool += customSpecialChars;
        requiredChars.push(getRandomChar(customSpecialChars, randFunc));
    }

    let passwordArray = [...requiredChars];

    while (passwordArray.length < targetLength) {
        passwordArray.push(getRandomChar(pool, randFunc));
    }

    if (passwordArray.length > targetLength) {
        passwordArray = passwordArray.slice(0, targetLength);
    }

    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(randFunc() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    const finalPassword = passwordArray.join('');

    elements.result.value = finalPassword;
    elements.result.classList.remove('fade-in');
    void elements.result.offsetWidth;
    elements.result.classList.add('fade-in');

    addHistory(finalPassword);
}
