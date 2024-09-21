import { tickTime } from "./GlobalVars.js"
import { 
    EPlayerInputs, 
    playerActions 
} from "./InputController.js"
import { Player } from "./Player.js"
import { checkForVerticalCollision } from "./CollisionManager.js"

let player = new Player();

let eventName = playerActions[EPlayerInputs.MOVELEFT].eventName;
player.playerHTML.addEventListener(eventName, () => {
    player.MoveLeft();
});

eventName = playerActions[EPlayerInputs.MOVERIGHT].eventName;
player.playerHTML.addEventListener(eventName, () => {
    player.MoveRight();
});

eventName = playerActions[EPlayerInputs.JUMP].eventName;
player.playerHTML.addEventListener(eventName, () => {
    player.Jump();
});

const dispatchPlayerInputEvents = (_ => {
    playerActions.forEach(action => {
        if (action.isActive) {
            player.playerHTML.dispatchEvent(action.actionEvent);
            action.ActionCompleted();
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