import { EPlayerInputs, playerActions } from "./InputController.js"
import { RigidBody } from "./RigidBody.js"

class Player {
    constructor() {
        this.moveSpeed = 5;
        this.playerHTML = this.CreatePlayerHTML();
        this.rigidBody = new RigidBody(20, 20);
    }

    CreatePlayerHTML() {
        const playerHTML = document.createElement("div");
        playerHTML.id = "player";
        document.getElementsByTagName("body")[0].appendChild(playerHTML);
        return playerHTML;
    }

    MoveLeft() {
        let playerBounds = this.playerHTML.getBoundingClientRect();
        this.playerHTML.style.left = (
            playerBounds.left 
            + window.scrollX 
            - this.moveSpeed
        ).toString() + "px";
    }

    MoveRight () {
        let playerBounds = this.playerHTML.getBoundingClientRect();
        this.playerHTML.style.left = (
            playerBounds.left 
            + window.scrollX 
            + this.moveSpeed
        ).toString() + "px";
    }

    Jump() {
        let playerBounds = this.playerHTML.getBoundingClientRect();
        this.playerHTML.style.top = (
            playerBounds.top 
            - 10
        ).toString() + "px";
    }
}

export { Player }