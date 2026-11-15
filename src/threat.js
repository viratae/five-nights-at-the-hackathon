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
    let threatTime = 0;
    function updateThreat(seconds) {
        threatEvents(seconds, threatTime);
        if(threatActive) {
            threatTime++;
        }
        else {
            threatTime = 0;
        }
    }
    function activateThreat() {
        if(!door.isActive) {
            threatActive = true;
        }
    }
    function deactivateThreat() {
        threatActive = false;
    }
    function threatEvents(seconds, threatTime) {
        if(threatTime >= 15) {
            renderer.renderLoss();
            game.deactivateTimer();
        }
        if(seconds == 400) {
            activateThreat();
            if(hallwayLight.isActive) {
                renderer.toggleThreat(true);
            }
        }
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