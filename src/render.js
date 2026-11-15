/*
Handles the rendering of screen components
*/
import {
    game,
    powerManager
} from "./game.js"
import { 
    hallwayLight,
    door 
} from "./powerUser.js";

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
    const hallwayButton = document.querySelector("#hallwayButton");
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
    hallwayButton.addEventListener('click', (e) => {
        hallwayLight.toggle();
        if(door.isActive) {
            door.deactivate();
            door.incrementClicks();
        }
    })
    doorButton.addEventListener('click', (e) => {
        door.toggle();
        if(hallwayLight.isActive) {
            hallwayLight.deactivate();
            hallwayLight.incrementClicks();
        }
    })
    function sayHi() {
        console.log("Connected!");
    }
    function changeBackgroundImage(style) {
        if (style == "doorClosed") {
            playPage.className = "";
            playPage.classList.add("doorClosed");
        }
        else if (style == "hallwayOn") {
            playPage.className = "";
            playPage.classList.add("hallwayOn");
        }
        else if (style == "default") {
            playPage.className = "";
        }
    }
    function removeState(style) {
        if(style == "doorClosed") {
            playPage.classList.remove("doorClosed");
        }
        else if(style == "hallwayOn") {
            playPage.classList.remove("hallwayOn");
        }
    }
    function renderPower() {
        let power = powerManager.getPower();
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
    function disable(component, bool) {
        component.disabled = bool;
    }
    function renderQuestion(overviewText, missionText, codeText, questionText, option1Text, option2Text, option3Text, option4Text, isMCQ) {
        const overview = document.querySelector("#overview");
        const mission = document.querySelector("#mission");
        const code = document.querySelector("#code");
        const question = document.querySelector("#questionText");

        const answerMCQ = document.querySelector("#answerMCQ");
        const answerFree = document.querySelector("#answerFree");
        overview.textContent = overviewText;
        mission.textContent = missionText;
        code.textContent = codeText;
        question.textContent = questionText;
        if (isMCQ) {
            showHide(answerMCQ, answerFree);
            const option1 = document.querySelector("#option1");
            const option2 = document.querySelector("#option2");
            const option3 = document.querySelector("#option3");
            const option4 = document.querySelector("#option4");
    
            option1.textContent = option1Text;
            option2.textContent = option2Text;
            option3.textContent = option3Text;
            option4.textContent = option4Text;
        } else {
            showHide(answerFree, answerMCQ);
            
        }
    }
    return {
        sayHi,
        changeBackgroundImage,
        removeState,
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
        const backgroundMusic = new Audio("./src/audio/backgroundMusic.mp3");
    
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.2;
        backgroundMusic.play();
    }
    function scarySound() {
        const scarySound = new Audio("./src/audio/quickScary.mp3")
        scarySound.play();
    }
    function menuClick() {
        const menuClick = new Audio("./src/audio/menuButton.mp3")
        menuClick.volume = 0.2;
        menuClick.play();
    }
    function correctSound() {
        const correctSound = new Audio("./src/audio/correct.mp3");
        correctSound.play();
    }
    function incorrectSound() {
        const incorrectSound = new Audio("./src/audio/incorrect.mp3");
        incorrectSound.play();
    }
    function doorClose() {
        const doorClose = new Audio("./src/audio/doorClose.mp3");
        renderer.changeBackgroundImage("doorClosed");
        doorClose.play();
    }
    
    function defaultState() {
        renderer.changeBackgroundImage("default");
    }
    function hallwayOn() {
        renderer.changeBackgroundImage("hallwayOn");
    }
    function lightsOffSound() {
        const lightsOff = new Audio("./src/audio/lightsOff.mp3");
        lightsOff.play();
    }
    function lightsOnSound() {
        const lightsOn = new Audio("./src/audio/lightsOn.mp3");
        lightsOn.play();
    }
    function jumpScareSound() {
        const jumpScareSound = new Audio("./src/audio/jumpscare.mp3");
        jumpScareSound.play();
    }
    return {
        startMusic,
        scarySound,
        menuClick,
        correctSound,
        incorrectSound,
        doorClose,
        hallwayOn,
        defaultState,
        lightsOffSound,
        lightsOnSound,
        jumpScareSound
    }
})();
export {
    renderer,
    effects
}