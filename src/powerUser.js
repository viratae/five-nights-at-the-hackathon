import { powerManager } from "./game.js";
import { effects, renderer } from "./render.js";
import { threat } from "./threat.js";
/*
* Acts as a template for both the door and hallway light 
* Also easily extends to other future power users 
*/
class PowerUser {
    isActive = false;
    clicks = 0;
    constructor(name, powerUsage, buttonComponent, isTogglable) {
        this.name = name;
        this.powerUsage = powerUsage;
        this.buttonComponent = buttonComponent;
        this.isTogglable = isTogglable;
    }
    /*
    * Tracks whether the object is being toggled or detoggled
    * Even if the object is technically detoggled by a nonclick (running out of power or activating other power user)
    * Clicks is incremented as a means of tracking toggle state
    */
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
        if (this.checkState()) {
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
        // Guarantees a penalty even if the player activates and deactivates the door before the clock update
        powerManager.setPower(powerManager.getPower() - 3);
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
        powerManager.setPower(powerManager.getPower() - 10);
        this.timeActive = true;
        effects.hallwayOn();
        if (threat.getThreatActive()) {
            renderer.toggleThreat(true);
        }
        effects.lightsOnSound();
    }
    deactivate() {
        renderer.removeState("hallwayOn")
        this.isActive = false;
        this.incrementClicks();
        renderer.toggleThreat(false);
        effects.lightsOffSound();
    }
    resetTime() {
        this.hallTime = 0;
        this.timeActive = false;
    }
}
const doorButton = document.querySelector("#doorButton");
const hallwayLightButton = document.querySelector("#hallwayButton");
const door = new Door("door", 3, doorButton, true);
const hallwayLight = new HallwayLight("hallway light", 10, hallwayLightButton, false);
export {
    door,
    hallwayLight
}