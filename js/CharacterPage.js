const avator = document.querySelector('.characterpage__avator')
const avatorCheckboxes = document.querySelectorAll('.characterpage__avator__option__input')
const name = document.querySelector('.characterpage__name')
const wins = document.querySelector('.characterpage__wins')
const loses = document.querySelector('.characterpage__loses')
const avatorOptions = document.querySelector('.characterpage__avator__options')

export default function CharacterPage() {
    avatorUpdate();
    nameUpdate();
    winsUpdate();
    losesUpdate();
    avatorCheckboxedInit();
}

function avatorCheckboxedInit() {
    avatorCheckboxes[+localStorage.getItem('avator')].checked = !avatorCheckboxes[+localStorage.getItem('avator')].checked;
}

function losesUpdate() {
    localStorage.getItem('losesCount') ? true : localStorage.setItem('losesCount', 0);
    loses.textContent = `${localStorage.getItem('losesCount')} loses`;
}

function winsUpdate() {
    localStorage.getItem('winsCount') ? true : localStorage.setItem('winsCount', 0);
    wins.textContent = `${localStorage.getItem('winsCount')} wins`;
}

function nameUpdate() {
    name.textContent = localStorage.getItem('nameCharacter');
}

function avatorUpdate() {
    localStorage.getItem('avator') ? true : localStorage.setItem('avator', 0);
    avator.src = `./assets/heroes_avator/${localStorage.getItem('avator')}.svg`;
}

avatorCheckboxes.forEach(el => {
    el.addEventListener('change', () => {
    if (el.checked) {
        const newAvatarID = el.id[el.id.length - 1];
        localStorage.setItem('avator', newAvatarID);
        localStorage.getItem('battleState') ? stateUpdateAvatar(newAvatarID) : false;
        avatorUpdate();
    }
    });
});

avator.addEventListener('click', () => {
    if (avatorOptions.style.transform === "scale(1)") {
        avatorOptions.style.transform = "scale(0)";
    } else {
        avatorOptions.style.transform = "scale(1)";
    }
});

function stateUpdateAvatar(id) {
    const state = JSON.parse(localStorage.getItem('battleState'));
    state.player.avatarID = id;
    localStorage.setItem('battleState', JSON.stringify(state));
}