import { powerManager } from "./game.js";
import { effects, renderer } from "./render.js";
import { threat } from "./threat.js";
class PowerUser {
    isActive = false;
    clicks = 0;
    constructor(name, powerUsage, buttonComponent) {
        this.name = name;
        this.powerUsage = powerUsage;
        this.buttonComponent = buttonComponent;
    }
    incrementClicks() {
        this.clicks++;
    }
    checkValid() {
        if (powerManager.getPower() >= this.powerUsage) {
            return true;
        } else {
            return false;
        }
    }
    toggle() {
        this.incrementClicks();
        if(this.checkState()) {
            this.activate();
        } else {
            this.deactivate();
            this.incrementClicks();
        }
    }
    checkState() {
        if (this.clicks % 2 == 1) {
            if (this.checkValid()) {
                this.isActive = true;
                return true;
            } 
            else {
                this.isActive = false;
                return false;
            }
        }
        this.isActive = false;
        return false;
    }

}
class Door extends PowerUser {
    activate() {
        renderer.toggleThreat(false);
        threat.deactivateThreat();
        effects.doorClose();
    }
    deactivate() {
        renderer.removeState("doorClosed")
        this.isActive = false;
        this.incrementClicks();
    }
}
class HallwayLight extends PowerUser {
    hallTime = 0;
    timeActive = false;
    activate() {
        this.timeActive = true;
        effects.hallwayOn();
        if(threat.getThreatActive()) {
            renderer.toggleThreat(true);
        }
    }
    deactivate() {
        renderer.removeState("hallwayOn")
        this.isActive = false;
        this.incrementClicks();
        renderer.toggleThreat(false);
    }
    resetTime() {
        this.hallTime = 0;
        this.timeActive = false;
    }
}
const doorButton = document.querySelector("#doorButton");
const hallwayLightButton = document.querySelector("#hallwayButton");
const door = new Door("door", 3, doorButton);
const hallwayLight = new HallwayLight("hallway light", 3, hallwayLightButton);
export {
    door,
    hallwayLight
}