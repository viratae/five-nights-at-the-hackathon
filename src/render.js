/*
* Handles the rendering of screen components
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
    const winPage = document.querySelector("#winPage");
    const instructionsButton = document.querySelector("#instructionsButton");
    const instructions = document.querySelector("#instructions");
    const closeModal = document.querySelector("#closeModal");
    const credits = document.querySelector("#credits");
    const creditsModal = document.querySelector("#creditsModal");
    const closeModalCredits = document.querySelector("#closeModalCredits");
    const gameLogic = document.querySelector("#gameLogic");
    const powerDisplay = document.querySelector("#powerDisplay");
    const timeDisplay = document.querySelector("#timeDisplay");
    const hallwayButton = document.querySelector("#hallwayButton");
    const doorButton = document.querySelector("#doorButton");
    const threat = document.querySelector("#threat");
    const screen = document.querySelector("#screen");
    const codeIcon = document.querySelector("#codeIcon");

    function showHide(show, hide) {
        show.classList.remove("hidden");
        hide.classList.add("hidden");
    }
    function toggleLights(isToggled) {
        const overlay = document.querySelector("#overlay");
        if (isToggled) {
            overlay.classList.remove("hidden");
        } else {
            overlay.classList.add("hidden");
        }
    }
    function toggleScreen(isToggled) {
        toggleLights(isToggled);
        if (isToggled) {
            screen.classList.remove("hidden");
            codeIcon.classList.add("hidden");
        } else {
            screen.classList.add("hidden");
            codeIcon.classList.remove("hidden");
        }
    }
    function toggleThreat(isToggled) {
        if (isToggled) {
            threat.classList.remove("hidden");
            effects.scarySound();
        } else {
            threat.classList.add("hidden");
        }  
    }
    
    
    function changeBackgroundImage(style) {
        if (style == "doorClosed") {
            playPage.className = "";
            playPage.classList.add("doorClosed");
        } else if (style == "hallwayOn") {
            playPage.className = "";
            playPage.classList.add("hallwayOn");
        } else if (style == "default") {
            playPage.className = "";
        }
    }
    /*
    * Instead of adding or removing door/light assets we change the background
    * entirely so the positioning is consistent and exact on varying screen widths
    */
    function removeState(style) {
        if (style == "doorClosed") {
            playPage.classList.remove("doorClosed");
        } else if(style == "hallwayOn") {
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
        toggleLights(false);
        showHide(losePage, playPage);
        effects.jumpScareSound();
    }
    function renderWin() {
        toggleLights(false);
        showHide(winPage, playPage);
        effects.playMusic(false);
        effects.victorySound();
    }
    function disable(component, bool) {
        component.disabled = bool;
    }
    function renderQuestion(overviewText, missionText, codeText, questionText, option1Text, option2Text, option3Text, option4Text, isMCQ, sourceText) {
        const overview = document.querySelector("#overview");
        const mission = document.querySelector("#mission");
        const code = document.querySelector("#code");
        const question = document.querySelector("#questionText");

        const answerMCQ = document.querySelector("#answerMCQ");
        const answerFree = document.querySelector("#answerFree");
        const source = document.querySelector("#source");
        overview.textContent = overviewText;
        mission.textContent = missionText;
        code.textContent = codeText;
        question.textContent = questionText;
        source.textContent = sourceText;
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
    startButton.addEventListener('click', (e) => {
        showHide(playPage, startPage);
        effects.menuClick();
        effects.playMusic(true);
    })
    instructionsButton.addEventListener('click', (e) => {
        showHide(gameLogic, instructions);
        game.startNight();
        effects.menuClick();
    })
    credits.addEventListener('click', (e) => {
        creditsModal.classList.remove("hidden");
    })
    closeModalCredits.addEventListener('click', (e) => {
        creditsModal.classList.add("hidden");
    })
    closeModal.addEventListener('click', (e) => {
       toggleScreen(false);
    })
    codeIcon.addEventListener('click', (e) => {
        toggleScreen(true);
    })
    hallwayButton.addEventListener('click', (e) => {
        hallwayLight.toggle();
        if (door.isActive) {
            door.deactivate();
            door.incrementClicks();
        }
    })
    doorButton.addEventListener('click', (e) => {
        door.toggle();
        if (hallwayLight.isActive) {
            hallwayLight.deactivate();
            hallwayLight.incrementClicks();
        }
    })
    return {
        sayHi,
        changeBackgroundImage,
        removeState,
        toggleThreat,
        renderPower,
        renderTime,
        renderQuestion,
        renderLoss,
        renderWin,
        disable
    }
})();
/*
* Controls the sound effects. While we could make one playSound() function and pass the sound 
* we made them separate to declare the audios here instead of throughout the code 
*/
const effects = (function effects() {
    const backgroundMusic = new Audio("./src/audio/backgroundMusic.mp3");
    function playMusic(isOn) {
        if (isOn) {
            backgroundMusic.loop = true;
            backgroundMusic.volume = 0.2;
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
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
    function victorySound() {
        const victorySound = new Audio("./src/audio/victory.mp3");
        victorySound.play();
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
        playMusic,
        scarySound,
        menuClick,
        correctSound,
        incorrectSound,
        victorySound,
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