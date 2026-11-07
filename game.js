import {
    effects,
    renderer
} from "./render.js"
const game = (function game() {
    const powerInterval = 3;
    const oneHour = 20;
    let power = 100;
    let powerDecrease = 1;
    let seconds = 1;
    let timerID = null;
    let clockTime = 0;
    let threatActive = false;
    let threatTime = 0;
    let doorPowerNeeded = 20;
    function startNight() {
        if (timerID != null) {
            return;
        }
        timerID = setInterval(() => {
            seconds++;
            if (threatActive) {
                threatTime++;
            }
            if (threatTime > 10) {
                renderer.renderLoss();
                console.log("The threat has been around too long. You lose.");
                clearInterval(timerID);
            }
            if (seconds % powerInterval == 0) {
                // Doubles the loss of power if a threat is active
                if (threatActive) {
                    power -= powerDecrease;
                }
                power -= powerDecrease;
                renderer.renderPower();
                console.log(power);
            }
            if (seconds % oneHour == 0) {
                clockTime++;
                renderer.renderTime();
            }
            if (seconds == (oneHour * 1.5)) {
                threatActive = true;
                renderer.toggleThreat(threatActive);
            }
            if (power < doorPowerNeeded) {
                const doorButton = document.querySelector("#doorButton");
                renderer.disable(doorButton, true);
            }
            else {
                renderer.disable(doorButton, false);
            }

        }, 1000);
    }
    function getPower() {
        return power;
    }
    function getTime() {
        return clockTime;
    }
    function raisePowerDecrease() {
        powerDecrease++;
    }
    function setPower(newPower) {
        if (newPower > 100) {
            power = 100;
        } 
        else if(newPower < 0) {
            power = 0;
        }
        else {
            power = newPower;
        }
        renderer.renderPower();
    }
    // Increments the required door power to make game harder as it progresses
    function manageDoor() {
        if (power >= doorPowerNeeded) {
            power -= doorPowerNeeded;
            doorPowerNeeded += 10;
            threatTime = 0;
            renderer.toggleThreat(false);
            threatActive = false;
            renderer.renderPower();
            effects.doorClose();
        }
    }
    return {
        startNight,
        getPower,
        getTime,
        raisePowerDecrease,
        setPower,
        manageDoor
    }  
})();

const questions = (function questions() {
    let questionNumber = 1;
    let lightsOn = true;

    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");
    const answerForm = document.querySelector("#answerForm");
    const answerInput = document.querySelector("#answerInput");
    option1.addEventListener('click', (e) => {
        handleQuestion(1);
    })
    option2.addEventListener('click', (e) => {
        handleQuestion(2);
    })
    option3.addEventListener('click', (e) => {
        handleQuestion(3);
    })
    option4.addEventListener('click', (e) => {
        handleQuestion(4);
    })
    answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleQuestion(answerInput.value);
        answerInput.value="";
    })
    function handleQuestion(option) {
        
        if (questionNumber == 1) {
            // Correct answer
            if (option == 4) {
                questionEffects(true);
            } 
            // Incorrect answer
            else {
                questionEffects(false);
            }
        }
        else if (questionNumber == 2) {
            // Correct answer
            if (option == "ShSHss" || option == "dev") {
                questionEffects(true);
                renderer.toggleLights(true);
            }
            // Incorrect answer
            else {
                questionEffects(false);
            }
        }
        else if (questionNumber == 3) {
            // Replaces the spaces in the player's input so that they get credit no matter the spacing
            if (option.replace(/\s/g, '') == "i<attempts;i++") {
                questionEffects(true);
            }
            else {
                questionEffects(false);
            }
        }
        questionNumber++;
        displayNextQuestion(questionNumber);
    }
    function questionEffects(isCorrect) {
        let power = game.getPower();
        if (isCorrect) {
            game.setPower(power + 10);
            effects.correctSound();
        }
        else {
            game.setPower(power - 15);
            game.raisePowerDecrease();
            effects.incorrectSound();
        }
        renderer.renderPower();
    }
    function displayNextQuestion(questionNumber) {
        let overview = "";
        let mission = "";
        let code = "";
        let question = "";

        let option1 = "";
        let option2 = "";
        let option3 = "";
        let option4 = "";
        let isMCQ = true;
        if (questionNumber == 2) {
            isMCQ = false;
            lightsOn = false;
            renderer.toggleLights(lightsOn);
            overview = "Whoa! The lights went out. It looks like somebody hacked into the building's server. Quick, gain access back before anything happens!";
            mission = "Figure out the scrambled password and turn the lights back on";

// NOTE: The code indentation must be like this in order to properly indent on the screen
code = `public static void main(String[] args) {
    String password = "You Shall NOT Pass";
    String[] split = password.split(" ");
    password = split[1];

    password = password.substring(0, 2);
    password += password.toUpperCase() + split[3].substring(2);
}`;
            question = "Find the right password to regain access ";
            
        }
        else if (questionNumber == 3) {
            isMCQ = false;
            overview = "Looks like they've now taken over control of the doors. If you can't gain access back, you won't be able to shut doors for some time and any threat can come inside!";
            mission = "Look at the door's current loop logic and fix it so that you get 3 attempts";
code = `public static void main(String[] args) {
    int attempts = 3;
    for (int i = 0; _____________) {
        System.Override();
    }
}`;
        }
        renderer.renderQuestion(overview, mission, code, question, option1, option2, option3, option4, isMCQ);
    }
    return {

    }
})();
export {
    game
}