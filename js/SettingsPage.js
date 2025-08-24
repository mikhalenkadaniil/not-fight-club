const input = document.getElementById('settingspage__input')
const btn = document.getElementById('settingspage__btn')

export default function SettingsPage() {
    inputUpdate();
}

function inputUpdate() {
    input.placeholder = localStorage.getItem('nameCharacter')
}

btn.addEventListener('click', () => {
    if(input.value) {
        const newName = input.value;
        input.value = '';
        localStorage.setItem('nameCharacter', newName);
        inputUpdate();
        localStorage.getItem('battleState') ? stateUpdateName(newName) : false;
    }
});

function stateUpdateName(name) {
    const state = JSON.parse(localStorage.getItem('battleState'));
    state.player.name = name;
    localStorage.setItem('battleState', JSON.stringify(state));
}