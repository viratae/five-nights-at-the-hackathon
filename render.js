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
        }
        else {
            overlay.classList.remove("hidden");
        }
    }
    function toggleThreat(isToggled) {
        if (isToggled) {
            threat.classList.remove("hidden");
        }
        else {
            threat.classList.add("hidden");
        }  
    }
    startButton.addEventListener('click', (e) => {
        console.log("Start Game");
        showHide(playPage, startPage);
        
    })
    instructionsButton.addEventListener('click', (e) => {
        showHide(grid, instructions);
        game.startNight();
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
        renderQuestion
    }
})();
export {
    renderer
}