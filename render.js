/*
Handles the rendering of screen components
*/
import {
    game
} from "./game.js"

const renderer = (function renderer() {
    const startButton = document.querySelector("#startButton");
    const startPage = document.querySelector("#startPage");
    const playPage = document.querySelector("#playPage");
    const losePage = document.querySelector("#losePage");
    const instructionsButton = document.querySelector("#instructionsButton");
    const instructions = document.querySelector("#instructions");
    const grid = document.querySelector("#grid");
    const powerDisplay = document.querySelector("#powerDisplay");
    const timeDisplay = document.querySelector("#timeDisplay");
    const doorButton = document.querySelector("#doorButton");
    const threat = document.querySelector("#threat");
    function showHide(show, hide) {
        show.classList.remove("hidden");
        hide.classList.add("hidden");
    }
    function toggleLights(isOn) {
        const overlay = document.querySelector("#overlay");
        if (isOn) {
            overlay.classList.add("hidden");
            effects.lightsOnSound();
        }
        else {
            overlay.classList.remove("hidden");
            effects.lightsOffSound();
        }
    }
    function toggleThreat(isToggled) {
        if (isToggled) {
            threat.classList.remove("hidden");
            effects.scarySound();
        }
        else {
            threat.classList.add("hidden");
        }  
    }
    startButton.addEventListener('click', (e) => {
        console.log("Start Game");
        showHide(playPage, startPage);
        effects.menuClick();
        effects.startMusic();
    })
    instructionsButton.addEventListener('click', (e) => {
        showHide(grid, instructions);
        game.startNight();
        effects.menuClick();

    })
    doorButton.addEventListener('click', (e) => {
        game.manageDoor();
    })
    function sayHi() {
        console.log("Connected!");
    }

    function renderPower() {
        let power = game.getPower();
        powerDisplay.textContent = power;
    }
    function renderTime() {
        let time = game.getTime();
        timeDisplay.textContent = time;
    }
    function renderLoss() {
        showHide(losePage, playPage);
        effects.jumpScareSound();
    }
    function disable(component) {
        component.disabled = true;
    }
    function renderQuestion(overviewText, missionText, codeText, questionText, option1Text, option2Text, option3Text, option4Text) {
        const overview = document.querySelector("#overview");
        const mission = document.querySelector("#mission");
        const code = document.querySelector("#code");
        const question = document.querySelector("#questionText");

        overview.textContent = overviewText;
        mission.textContent = missionText;
        code.textContent = codeText;
        question.textContent = questionText;
        const option1 = document.querySelector("#option1");
        const option2 = document.querySelector("#option2");
        const option3 = document.querySelector("#option3");
        const option4 = document.querySelector("#option4");

        option1.textContent = option1Text;
        option2.textContent = option2Text;
        option3.textContent = option3Text;
        option4.textContent = option4Text;
    }
    return {
        sayHi,
        toggleLights,
        toggleThreat,
        renderPower,
        renderTime,
        renderQuestion,
        renderLoss,
        disable
    }
})();
const effects = (function effects() {
    function startMusic() {
        const backgroundMusic = new Audio("audio/backgroundMusic.mp3");
    
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.2;
        backgroundMusic.play();
    }
    function scarySound() {
        const scarySound = new Audio("audio/quickScary.mp3")
        scarySound.play();
    }
    function menuClick() {
        const menuClick = new Audio("audio/menuButton.mp3")
        menuClick.volume = 0.2;
        menuClick.play();
    }
    function correctSound() {
        const correctSound = new Audio("audio/correct.mp3");
        correctSound.play();
    }
    function incorrectSound() {
        const incorrectSound = new Audio("audio/incorrect.mp3");
        incorrectSound.play();
    }
    function doorClose() {
        const doorClose = new Audio("audio/doorClose.mp3");
        doorClose.play();
    }
    function lightsOffSound() {
        const lightsOff = new Audio("audio/lightsOff.mp3");
        lightsOff.play();
    }
    function lightsOnSound() {
        const lightsOn = new Audio("audio/lightsOn.mp3");
        lightsOn.play();
    }
    function jumpScareSound() {
        const jumpScareSound = new Audio("audio/jumpscare.mp3");
        jumpScareSound.play();
    }
    return {
        startMusic,
        scarySound,
        menuClick,
        correctSound,
        incorrectSound,
        doorClose,
        lightsOffSound,
        lightsOnSound,
        jumpScareSound
    }
})();
export {
    renderer,
    effects
}