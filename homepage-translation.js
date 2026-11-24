//element,en,fr
const text = [
    ['#about-me-header','about me','à propos de moi'],
    ['#hello-text','hello, i\'m Eshaan B. Patel','bonjour, je suis Eshaan B. Patel'],
];
function chooseLanguage(langIndex) {
    for (let a of text) {
        document.querySelector(a[0]).innerHTML = a[langIndex];
    }
}

function updateLanguage() {
    switch (document.querySelector('#langSelect').value) {
        case 'fr':
            chooseLanguage(2);
            break;
        default:
            chooseLanguage(1);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#langSelect').addEventListener('change', updateLanguage);
    updateLanguage();
});