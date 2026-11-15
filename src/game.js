import {
    effects,
    renderer
} from "./render.js"
import {
    door,
    hallwayLight
} from "./powerUser.js"
import {
    threat
} from "./threat.js"

const game = (function game() {
    const oneHour = 20;
    let seconds = 1;
    let timerID = null;
    let clockTime = 0;
    function startNight() {
        if (timerID != null) {
            return;
        }
        timerID = setInterval(() => {
            seconds++;
            threat.updateThreat(seconds);
            powerManager.updatePower(seconds);
            if (seconds % oneHour == 0) {
                clockTime++;
                renderer.renderTime();
            }

        }, 1000);
    }
    function deactivateTimer() {
        clearInterval(timerID);
    }
    
    function getTime() {
        return clockTime;
    }  
    
    return {
        startNight,
        deactivateTimer,
        getTime,
        
    }  
})();
const powerManager = (function power() {
   
    let power = 100;
    let powerDecrease = 1;
    let powerInterval = 3;
    function updatePower(seconds) {
        updateObjectPower(door);
        updateObjectPower(hallwayLight);
        if(seconds % powerInterval == 0) {
            power -= powerDecrease;
            renderer.renderPower();
        }
        if(door.isActive && door.checkState() == false) {
            door.deactivate();
        }
        if(hallwayLight.isActive && hallwayLight.checkState() == false) {
            hallwayLight.deactivate();
        }
    }
    function getPower() {
        return power;
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
    function updateObjectPower(powerUser) {
        if(powerUser.isActive) {
            power -= powerUser.powerUsage;
            if(power < powerUser.powerUsage) {
                renderer.disable(powerUser.buttonComponent, true);
            }
            else {
                renderer.disable(powerUser.buttonComponent, false);
            }
            renderer.renderPower();
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