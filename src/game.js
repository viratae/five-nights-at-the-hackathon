import {
    renderer
} from "./render.js"
import {
    door,
    hallwayLight
} from "./powerUser.js"
import {
    threat
} from "./threat.js"
/*
* Manages the timer and start logic. 
*/
const game = (function game() {
    const oneHour = 24;
    let seconds = 1;
    let timerID = null;
    let clockTime = 0;
    function startNight() {
        if (timerID != null) {  // Avoid duplicate timers
            return;
        }
        timerID = setInterval(() => {
            seconds++;
            threat.updateThreat(seconds);
            powerManager.updatePower(seconds);
            updateHallway(hallwayLight.timeActive);
            // When seconds is a multiple of oneHour, the hour on the clock increases
            if (seconds % oneHour == 0) {
                clockTime++;
                renderer.renderTime();
            }
            // The game sholuld end at 6 AM
            if (clockTime == 6) {
                deactivateTimer();
                renderer.renderWin();
            }

        }, 1000);
    }
    function deactivateTimer() {
        clearInterval(timerID);
    }
    
    function getTime() {
        return clockTime;
    }  
    /*
    * The hallway light is on a timer unlike the door
    * The hallway is active for 5 seconds and coolsdown for th next 10
    * 
    * This is because the door is useless (except for quickly deactivating the threat) 
    * if the hallway light can always be activated
    * Now users might close the door "just in case"
    */
    function updateHallway(timeActive) {
        if (timeActive) {
            hallwayLight.hallTime++;
            if (hallwayLight.hallTime <= 5) {
                renderer.disable(hallwayLight.buttonComponent, true);
            } else if (hallwayLight.hallTime <= 15) {
                renderer.disable(hallwayLight.buttonComponent, true);
                if (hallwayLight.isActive) {
                    hallwayLight.deactivate();
                }
            } else {
                hallwayLight.resetTime();
                renderer.disable(hallwayLight.buttonComponent, false)
            }
        }
    }
    return {
        startNight,
        deactivateTimer,
        getTime,
        updateHallway
    }  
})();
/*
* Manages the power and interactions with powerUser objects
*/
const powerManager = (function power() {
    let power = 100;
    let powerDecrease = 1;
    let powerInterval = 3;  // After how many seconds the power decreases
    function updatePower(seconds) {
        updateObjectPower(door);
        updateObjectPower(hallwayLight);
        if (seconds % powerInterval == 0) {
            setPower(power - powerDecrease);
            renderer.renderPower();
        }
        if (door.isActive && door.checkState() == false) {
            door.deactivate();
        }
        if (hallwayLight.isActive && hallwayLight.checkState() == false) {
            hallwayLight.deactivate();
        }
        if (power <= 0 ) {
            game.deactivateTimer();
            renderer.renderLoss();
        }
    }
    function getPower() {
        return power;
    }
    // Increases how much power the player loses per second if the player gets the question wrong
    function raisePowerDecrease() {
        powerDecrease++;
    }
    function setPower(newPower) {
        if (newPower > 100) {
            power = 100;
        } else if (newPower < 0) {
            power = 0;
        } else {
            power = newPower;
        }
        renderer.renderPower();
    }
    function updateObjectPower(powerUser) {
        if (powerUser.isActive) {
            if (powerUser.isTogglable) {
                setPower(power - powerUser.powerUsage);
            } else {
                renderer.disable(powerUser.buttonComponent, false);
            }
            renderer.renderPower();
        }
        if (power < powerUser.powerUsage) {
            renderer.disable(powerUser.buttonComponent, true);
        } else {
            /*
            * The state of the hallway may occasionally glitch because updateHallwayLight processes
            * that the state cannot be active during cooldown
            */
            renderer.disable(powerUser.buttonComponent, false);
        }
    }
    return {
        updatePower,
        getPower,
        raisePowerDecrease,
        setPower,
    }
})();

export {
    game,
    powerManager
}