const playerName = document.getElementById('battlepage__player__name')
const playerAvatar = document.getElementById('battlepage__player__avatar')
const playerHP = document.getElementById('battlepage__player__HP')
const playerHPNumber = document.getElementById('battlepage__player__HP__number')
const enemyName = document.getElementById('battlepage__enemy__name')
const enemyAvatar = document.getElementById('battlepage__enemy__avatar')
const enemyHP = document.getElementById('battlepage__enemy__HP')
const enemyHPNumber = document.getElementById('battlepage__enemy__HP__number')
const battleZoneInputs = document.querySelectorAll('.battlepage__logic__attack__option__input')
const attackBtn = document.querySelector('.battlepage__logic__btn')

let attackFlag = false;
let defenceCounter = 0;

export default function BattlePage() {
    dataRender();
}

function dataRender() {
    localStorage.getItem('battleState') ? true : localStorage.setItem('battleState', JSON.stringify(battleStateInit()));
    const state = JSON.parse(localStorage.getItem('battleState'));
    playerName.textContent = state.player.name;
    playerAvatar.src = `./assets/heroes_avator/${state.player.avatarID}.svg`;
    playerHP.style.width = `${(state.player.HP / state.player.maxHP) * 100}%`;
    playerHPNumber.textContent = `${state.player.HP}/${state.player.maxHP}`;
    enemyName.textContent = state.enemy.name;
    enemyAvatar.src = `./assets/enemys_avator/${state.enemy.avatarID}.jpg`;
    enemyHP.style.width = `${(state.enemy.HP / state.enemy.maxHP) * 100}%`;
    enemyHPNumber.textContent = `${state.enemy.HP}/${state.enemy.maxHP}`;
}

function battleStateInit() {
    localStorage.getItem('avator') ? true : localStorage.setItem('avator', 0);
    localStorage.getItem('winsCount') ? true : localStorage.setItem('winsCount', 0);
    localStorage.getItem('losesCount') ? true : localStorage.setItem('losesCount', 0);
    const enemyID = getRandomInt(3);
    const enemyName = getNameOfEnemy(enemyID);
    const enemyHP = getHPOfEnemy(enemyID);
    return {
        player: {
            name: localStorage.getItem('nameCharacter'),
            avatarID: localStorage.getItem('avator'),
            HP: 150,
            maxHP: 150,
        },
        enemy: {
            name: enemyName,
            avatarID: enemyID,
            HP: enemyHP,
            maxHP: enemyHP,
        },
        battleLog: [],
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

function getNameOfEnemy(id) {
    const NAMES = {
        0: 'Boar',
        1: 'Wolf',
        2: 'Bear',
    }
    return NAMES[id];
}

function getHPOfEnemy(id) {
    const HP = {
        0: 150,
        1: 100,
        2: 300,
    }
    return HP[id];
}

battleZoneInputs.forEach((el) => {
    el.addEventListener('change', (event) => {
        if(event.target.type === "radio") {
            attackFlag = true;
        } else {
            event.target.checked ? defenceCounter++ : defenceCounter--;
        }
        if (attackFlag && defenceCounter === 2) {
            attackBtn.classList.add('battlepage__logic__btn__active');
            attackBtn.disabled = false;
        } else {
            attackBtn.classList.remove('battlepage__logic__btn__active');
            attackBtn.disabled = true;
        }
    });
});