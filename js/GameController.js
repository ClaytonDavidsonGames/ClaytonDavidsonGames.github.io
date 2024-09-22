import { tickTime } from "./GlobalVars.js"
import { 
    EPlayerInputs, 
    playerActions 
} from "./InputController.js"
import { Player } from "./Player.js"
import { checkForVerticalCollision } from "./CollisionManager.js"

let player = new Player();

//Move left input events
player.playerHTML.addEventListener(
    playerActions[EPlayerInputs.MOVELEFT].activeEventName, () => {
    player.MoveLeft(true);
});
player.playerHTML.addEventListener(
    playerActions[EPlayerInputs.MOVELEFT].endEventName, () => {
    player.MoveLeft(false);
});
player.playerHTML.setAttribute(
    playerActions[EPlayerInputs.MOVELEFT].activeEventName, true
);
player.playerHTML.setAttribute(
    playerActions[EPlayerInputs.MOVELEFT].endEventName, true
);

//Move right input events
player.playerHTML.addEventListener(
    playerActions[EPlayerInputs.MOVERIGHT].activeEventName, () => {
    player.MoveRight(true);
});
player.playerHTML.addEventListener(
    playerActions[EPlayerInputs.MOVERIGHT].endEventName, () => {
    player.MoveRight(false);
});
player.playerHTML.setAttribute(
    playerActions[EPlayerInputs.MOVERIGHT].activeEventName, true
);
player.playerHTML.setAttribute(
    playerActions[EPlayerInputs.MOVERIGHT].endEventName, true
);

//Jump input events
player.playerHTML.addEventListener(
    playerActions[EPlayerInputs.JUMP].startEventName, () => {
    player.Jump();
});
player.playerHTML.setAttribute(
    playerActions[EPlayerInputs.JUMP].startEventName, true
);

//Dispatch input events start, active, end
const dispatchPlayerInputEvents = (_ => {
    playerActions.forEach(action => {
        if (action.isActive) {
                if (action.startTrigger &&
                    player.playerHTML.getAttribute(action.startEventName)) {
                player.playerHTML.dispatchEvent(action.actionEventStart);
                action.startTrigger = false;
            }
            else if (player.playerHTML.getAttribute(action.activeEventName)) {
                player.playerHTML.dispatchEvent(action.actionEventActive);
            }
        }
        else if (action.endTrigger &&
                player.playerHTML.getAttribute(action.endEventName)) {
            player.playerHTML.dispatchEvent(action.actionEventEnd)
            action.endTrigger = false;
        }
    });
});

const checkForCollisions = (_ => {
    return checkForVerticalCollision(player.playerHTML);
});

const gameTick = (_ => {
    dispatchPlayerInputEvents();
    if (!checkForCollisions()) {
        let playerBounds = player.playerHTML.getBoundingClientRect();
        player.playerHTML.style.top = (
            playerBounds.top 
            + window.scrollY 
            + player.moveSpeed
        ).toString() + "px";

        if (playerBounds.top >= 750) {
            player.playerHTML.style.top = window.scrollY.toString() + "px";
        }
    }
});

setInterval(gameTick, tickTime);

for (let i = 0; i < 10; i++) {
    let platformHTML = document.createElement("div");
    platformHTML.className = "platform";
    platformHTML.style.width = "100px";
    platformHTML.style.height = "25px";
    platformHTML.style.left = Math.floor(Math.random() * 500).toString() + "px";
    platformHTML.style.top = Math.floor(Math.random() * 1000).toString() + "px";
    document.getElementsByTagName("body")[0].appendChild(platformHTML);
}