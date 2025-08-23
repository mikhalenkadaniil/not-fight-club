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

function getRandomNumbers(amount, max) {
    const numbers = [];
    while (numbers.length < amount) {
        const randomInt = getRandomInt(max);
        if (!numbers.includes(randomInt)) numbers.push(randomInt);
    }
    return numbers;
}

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

attackBtn.addEventListener('click', () => {
    attack();
});

function attack() {
    const state = JSON.parse(localStorage.getItem('battleState'));
    const attackLog = {
        player: getPlayerTargets(),
        enemy: getEnemyTargets(state.enemy.avatarID),
    }
    state.battleLog.push(attackLog);
    localStorage.setItem('battleState', JSON.stringify(state));
    recalculateState(attackLog);
}

function recalculateState(log) {
    const state = JSON.parse(localStorage.getItem('battleState'));
    const playerDamage = calculatePlayerDamage(log);
    const enemyDamage = calculateEnemyDamage(log);
    if (state.enemy.HP - playerDamage < 1) {
        state.enemy.HP = 0;
    } else {
        state.enemy.HP -= playerDamage;
    }
    if (state.player.HP - enemyDamage < 1) {
        state.player.HP = 0;
    } else {
        state.player.HP -= enemyDamage;
    }
    localStorage.setItem('battleState', JSON.stringify(state));
    dataRender();
}

function calculateEnemyDamage(log) {
    let enemyDamage = 30;
    let result = 0;
    log.enemy.attack.target.forEach((target, i) => {
        let isBlock = false;
        if (log.enemy.attack.isCritical[i]) {
            result += enemyDamage * 1.5;
            return;
        }
        log.player.defence.forEach((el) => {
            if (el === target) isBlock = true;
        });
        if (isBlock) return;
        result += enemyDamage;
    });
    return result;
}

function calculatePlayerDamage(log) {
    let playerDamage = 30;
    if (log.player.attack.isCritical[0]) return (playerDamage * 1.5);
    log.enemy.defence.forEach((el) => {
        if (el === log.player.attack.target[0]) playerDamage = 0;
    });
    return playerDamage;
}

function isCritical() {
    if(getRandomInt(10) > 2) return false;
    return true;
}

function getPlayerTargets() {
    const attacks = [];
    const defence = [];
    battleZoneInputs.forEach((el) => {
        if (el.checked) {
            if (el.id[0] === 'a') attacks.push(+el.id[el.id.length - 1]);
            if (el.id[0] === 'd') defence.push(+el.id[el.id.length - 1]);
        }
    });
    return {
        attack: {
            target: attacks,
            isCritical: [isCritical()],
        },
        defence: defence,
    }
}

function getEnemyTargets(ID) {
    switch (ID) {
        case(0):
            return getBoarTargets();
        case(1):
            return getWolfTargets();
        case(2):
            return getBearTargets();
        default:
            return null;
    }
}

function getBoarTargets() {
    return {
        attack: {
            target: [getRandomInt(5)],
            isCritical: [isCritical()],
        },
        defence: getRandomNumbers(2, 5),
    }
}

function getWolfTargets() {
    return {
        attack: {
            target: getRandomNumbers(2, 5),
            isCritical: [isCritical(), isCritical()],
        },
        defence: [],
    }
}

function getBearTargets() {
    return {
        attack: {
            target: [getRandomInt(5)],
            isCritical: [isCritical()],
        },
        defence: [],
    }
}