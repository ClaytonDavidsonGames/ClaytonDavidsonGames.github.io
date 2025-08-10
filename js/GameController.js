import { tickTime } from "./GlobalVars.js"
import { 
    EPlayerInputs, 
    playerActions 
} from "./InputController.js"
import { Vector } from "./RigidBody.js"
import { Player } from "./Player.js"
import { Asteroid } from "./Asteroid.js"
import { checkForVerticalCollision } from "./CollisionManager.js"
import { UpdateViewportPosition } from "./Viewport.js"

let game_canvas = document.getElementById("game_canvas");
let game_zone = document.getElementById("game_zone");
let player = new Player(game_canvas);

//Rotate left input events
game_zone.addEventListener(
    playerActions[EPlayerInputs.ROTATELEFT].activeEventName, () => {
    player.RotateLeft(true);
});
game_zone.addEventListener(
    playerActions[EPlayerInputs.ROTATELEFT].endEventName, () => {
    player.RotateLeft(false);
});
game_zone.setAttribute(
    playerActions[EPlayerInputs.ROTATELEFT].activeEventName, true
);
game_zone.setAttribute(
    playerActions[EPlayerInputs.ROTATELEFT].endEventName, true
);

//Rotate right input events
game_zone.addEventListener(
    playerActions[EPlayerInputs.ROTATERIGHT].activeEventName, () => {
    player.RotateRight(true);
});
game_zone.addEventListener(
    playerActions[EPlayerInputs.ROTATERIGHT].endEventName, () => {
    player.RotateRight(false);
});
game_zone.setAttribute(
    playerActions[EPlayerInputs.ROTATERIGHT].activeEventName, true
);
game_zone.setAttribute(
    playerActions[EPlayerInputs.ROTATERIGHT].endEventName, true
);

//Add thrust input events
game_zone.addEventListener(
    playerActions[EPlayerInputs.ADDTHRUST].activeEventName, () => {
    player.AddThrust(true);
});
game_zone.addEventListener(
    playerActions[EPlayerInputs.ADDTHRUST].endEventName, () => {
    player.AddThrust(false);
});
game_zone.setAttribute(
    playerActions[EPlayerInputs.ADDTHRUST].activeEventName, true
);
game_zone.setAttribute(
    playerActions[EPlayerInputs.ADDTHRUST].endEventName, true
);

//Dispatch input events start, active, end
const dispatchPlayerInputEvents = (_ => {
    playerActions.forEach(action => {
        if (action.isActive) {
                if (action.startTrigger &&
                    game_zone.getAttribute(action.startEventName)) {
                game_zone.dispatchEvent(action.actionEventStart);
                action.startTrigger = false;
            }
            else if (game_zone.getAttribute(action.activeEventName)) {
                game_zone.dispatchEvent(action.actionEventActive);
            }
        }
        else if (action.endTrigger &&
                game_zone.getAttribute(action.endEventName)) {
            game_zone.dispatchEvent(action.actionEventEnd)
            action.endTrigger = false;
        }
    });
});

const gameTick = (_ => {
    dispatchPlayerInputEvents();
    player.UpdatePlayerPhysics();
    player.UpdatePlayerSprite();
    player.CheckPlayerWrapScreen();

    UpdateViewportPosition(player);
});

setInterval(gameTick, tickTime);