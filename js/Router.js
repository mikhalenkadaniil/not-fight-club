import BattlePage from "./BattlePage.js";
import CharacterPage from "./CharacterPage.js";
import SettingsPage from "./SettingsPage.js";

const logo = document.getElementById('logoText')
const homePage = document.querySelector('.homepage')
const characterPage = document.querySelector('.characterpage')
const settingsPage = document.querySelector('.settingspage')
const navElements = document.querySelectorAll('.nav__element')
const fightBtn = document.querySelector('.fightBtn')
const battlePage = document.querySelector('.battlepage')

export default function Router () {
    toHomePage();
}

function toHomePage() {
    logo.textContent = 'Home';
    characterPage.style.display = 'none';
    settingsPage.style.display = 'none';
    battlePage.style.display = 'none';
    homePage.style.display = 'flex';
}

function toCharacterPage() {
    logo.textContent = 'Character';
    settingsPage.style.display = 'none';
    homePage.style.display = 'none';
    battlePage.style.display = 'none';
    characterPage.style.display = 'flex';
    CharacterPage();
}

function toSettingsPage() {
    logo.textContent = 'Settings';
    homePage.style.display = 'none';
    characterPage.style.display = 'none';
    battlePage.style.display = 'none';
    settingsPage.style.display = 'flex';
    SettingsPage();
}

function toBattlePage() {
    logo.textContent = 'Battle';
    homePage.style.display = 'none';
    characterPage.style.display = 'none';
    settingsPage.style.display = 'none';
    battlePage.style.display = 'grid';
    BattlePage();
}

navElements.forEach((el) => {
    el.addEventListener('click',() => {
        switch(el.id) {
            case "nav__element__0":
                toHomePage();
                break;
            case "nav__element__1":
                toCharacterPage();
                break;
            case "nav__element__2":
                toSettingsPage();
                break;
            default:
                toHomePage();
        }
    });
});

fightBtn.addEventListener('click', () => {
    toBattlePage();
});