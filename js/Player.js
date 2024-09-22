import { EPlayerInputs, playerActions } from "./InputController.js"
import { 
    RigidBody, 
    Vector
} from "./RigidBody.js"

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

    MoveLeft(bActive) {
        if (bActive) {
            this.rigidBody.SetXVelocity(-this.moveSpeed);
        }
        else {
            this.rigidBody.SetXVelocity(0);
        }
    }

    MoveRight (bActive) {
        if (bActive) {
            this.rigidBody.SetXVelocity(this.moveSpeed);
        }
        else {
            this.rigidBody.SetXVelocity(0);
        }
    }

    Jump() {
        this.rigidBody.AddYVelocity(-15);
    }

    UpdatePlayerPhysics() {
        this.rigidBody.UpdatePosition();
    }

    UpdatePlayerSprite() {
        let position = this.rigidBody.GetPosition();
        let playerBounds = this.playerHTML.getBoundingClientRect();
            this.playerHTML.style.left = position.x.toString() + "px";
            this.playerHTML.style.top = position.y.toString() + "px";
    }
}

export { Player }