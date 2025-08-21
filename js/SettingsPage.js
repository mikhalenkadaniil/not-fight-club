const input = document.getElementById('settingspage__input')
const btn = document.getElementById('settingspage__btn')

export default function SettingsPage() {
    inputUpdate();
}

function inputUpdate() {
    input.placeholder = localStorage.getItem('nameCharacter')
}

btn.addEventListener('click', () => {
    localStorage.setItem('nameCharacter', input.value);
    input.value = '';
    inputUpdate();
});