import {
    renderer
} from "./render.js"
const game = (function game() {
    const powerInterval = 3;
    let power = 100;
    let powerDecrease = 1;
    let seconds = 1;
    let timerID = null;
    let clockTime = 0;
    
    function startNight() {
        if (timerID != null) {
            return;
        }
        timerID = setInterval(() => {
            seconds++;
            if (seconds % powerInterval == 0) {
                power -= powerDecrease;
                renderer.renderPower();
                console.log(power);
            }
            if (seconds % 20 == 0) {
                clockTime++;
                renderer.renderTime();
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
    return {
        startNight,
        getPower,
        getTime,
        raisePowerDecrease,
        setPower
    }  
})();
const questions = (function questions() {
    let questionNumber = 1;
    let lightsOn = true;

    const option1 = document.querySelector("#option1");
    const option2 = document.querySelector("#option2");
    const option3 = document.querySelector("#option3");
    const option4 = document.querySelector("#option4");

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
    function handleQuestion(option) {
        let power = game.getPower();
        if (questionNumber == 1) {
            // Correct answer
            if (option == 4) {
                game.setPower(power + 10);
            } 
            // Incorrect answer
            else {
                game.setPower(power - 15);
                game.raisePowerDecrease();
            }
        }
        else if (questionNumber == 2) {
            // Correct answer
            if (option == 2) {
                game.setPower(power + 10);
                lightsOn = true;
                renderer.toggleLights(lightsOn);
            }
            // Incorrect answer
            else {
                game.setPower(power - 15);
                game.raisePowerDecrease();
            }
        }
        questionNumber++;
        displayNextQuestion(questionNumber);
        
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
        if (questionNumber == 2) {
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
            option1 = "SHshss";
            option2 = "ShSHss";
            option3 = "ShNOss";
            option4 = "SHnoSS";
        }
        renderer.renderQuestion(overview, mission, code, question, option1, option2, option3, option4);
    }
    return {

    }
})();
export {
    game
}