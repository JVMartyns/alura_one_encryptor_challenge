const inputTextArea = document.querySelector('.input-text-area');
const outputSection = document.querySelector('.output-section');
const outputTextArea = document.querySelector('.output-text-area');
const nothingHereMessageBox = document.querySelector('.nothing-here-message-box');
const btnEncrypt = document.querySelector('.btn-encrypt');
const btnDecrypt = document.querySelector('.btn-decrypt');
const btnCopy = document.querySelector('.btn-copy');
const infoMessage = document.querySelector('.info p');
const infoMessageDefaultColor = '#495057';
const inputTextPattern = /^[A-z ]+$/gm;

const matrixCode = [
    ['e', 'enter'],
    ['i', 'imes'],
    ['a', 'ai'],
    ['o', 'ober'],
    ['u', 'ufat']
];

function encrypt(text) {
    for (let i = 0; i < matrixCode.length; i++) {
        if (text.includes(matrixCode[i][0])) {
            text = text.replaceAll(matrixCode[i][0], matrixCode[i][1]);
        }
    }
    return text;
}

function decrypt(text) {
    for (let i = 0; i < matrixCode.length; i++) {
        if (text.includes(matrixCode[i][1])) {
            text = text.replaceAll(matrixCode[i][1], matrixCode[i][0]);
        }
    }
    return text;
}

function updateOutputSectionContent() {
    if (outputTextArea.value.length > 0) {
        outputSection.style.height = 'auto';
        outputTextArea.style.display = 'static';
        outputTextArea.style.backgroundImage = 'none';
        nothingHereMessageBox.style.visibility = "hidden";
        btnCopy.style.visibility = "visible";
    } else {
        nothingHereMessageBox.style.visibility = 'visible';
        btnCopy.style.visibility = 'hidden';
        if (screen.width > 768) {
            outputTextArea.style.backgroundImage = ' url(images/searching.png)';
        }
    }
}

function adjustTextAreaToText(element) {
    if (screen.width <= 768) {
        element.style.height = '1px';
        element.style.height = element.scrollHeight + 'px';
    }
}

function processTextToEncrypt() {
    if (inputTextArea.value.length > 0) {
        if (inputTextArea.value.match(inputTextPattern)) {
            outputTextArea.value = encrypt(inputTextArea.value.toLowerCase().trim());
            inputTextArea.value = '';
            updateOutputSectionContent();
            adjustTextAreaToText(outputTextArea);
        } else {
            infoMessage.style.color = 'red';
        }
    }
}

function processTextToDecrypt() {
    if (inputTextArea.value.length > 0) {
        outputTextArea.value = decrypt(inputTextArea.value.toLowerCase());
        inputTextArea.value = '';
        adjustTextAreaToText(outputTextArea);
    }
}

function changeInfoMessageColor() {
    infoMessage.style.color = infoMessageDefaultColor;
}

function copyTextToClipboard() {
    navigator.clipboard.writeText(outputTextArea.value);
}

btnEncrypt.onclick = processTextToEncrypt;

btnDecrypt.onclick = processTextToDecrypt;

btnCopy.onclick = copyTextToClipboard;

inputTextArea.onfocus = changeInfoMessageColor;

setInterval(updateOutputSectionContent, 1);
