import {
    game
} from "./game.js"
import {
    renderer
} from "./render.js"
import {
    door,
    hallwayLight
} from "./powerUser.js"
const threat = (function threat() {
    let threatActive = false;
    let timeThreatActive = 0;  // The amount of time the threat has been active
    let timeSinceThreat = 0;  
    let threatRandom = generateThreatTime(15, 20);
    function updateThreat(seconds) {
        threatEvents(seconds, timeThreatActive);
        if (threatActive) {
            timeThreatActive++;
        }
        else {
            timeThreatActive = 0;
        }
    }
    function activateThreat() {
       /*
        * Sometimes the threat activates when the door or light is already active
        * This ensures they do their function even if they are not called after the threat activates
       */
        if (!door.isActive) {
            threatActive = true;
        }
        
        if (hallwayLight.isActive) {
            renderer.toggleThreat(true);
        }
    }
    function deactivateThreat() {
        threatActive = false;
    }
    // While seconds isn't currently used, future threats might be hardcoded to appear at certain times
    function threatEvents(seconds, timeThreatActive) {
        timeSinceThreat++;
        if (timeThreatActive >= 18) {
            renderer.renderLoss();
            game.deactivateTimer();
        }
        if (timeSinceThreat == threatRandom) {
            activateThreat();
            // Generates a time variable enough to be unpredictable, but not to be too frequent/rare
            threatRandom = generateThreatTime(20, 45);
            timeSinceThreat = 0;
        }
    }
    
    function generateThreatTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getThreatActive() {
        return threatActive;
    }
    return {
        updateThreat,
        deactivateThreat,
        getThreatActive
    }
})();
export {
    threat
}