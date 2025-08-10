import { EPlayerInputs, playerActions } from "./InputController.js"
import { 
    RigidBody, 
    Vector
} from "./RigidBody.js"

class Player {
    constructor(game_canvas) {
        this.thrustSpeed = 0.075;
        this.turnSpeed = 3;
        this.game_canvas = game_canvas
        this.playerSize = new Vector(32, 32);
        this.rigidBody = new RigidBody(this.playerSize.x, this.playerSize.y);
    }

    RotateLeft(bActive) {
        if (bActive) {
            this.rigidBody.SetRotation(this.rigidBody.rotation - this.turnSpeed);
        }
    }

    RotateRight(bActive) {
        if (bActive) {
            this.rigidBody.SetRotation(this.rigidBody.rotation + this.turnSpeed);
        }
    }

    AddThrust(bActive) {
        if (bActive) {
            this.rigidBody.AddForwardVelocity(new Vector(this.thrustSpeed, 0));
        }
    }

    UpdatePlayerPhysics() {
        this.rigidBody.UpdateRotation();
        this.rigidBody.UpdateVelocity();
        this.rigidBody.UpdatePosition();
    }

    UpdatePlayerSprite() {
        let position = this.rigidBody.GetPosition();
        let rotation = this.rigidBody.GetRotation();

        if (this.game_canvas.getContext) {
            const canvas = this.game_canvas.getContext("2d");
            canvas.translate(position.x + (this.playerSize.x / 2), position.y + (this.playerSize.y / 2));
            canvas.rotate((Math.PI / 180) * rotation);
            
            const img = new Image();
            img.addEventListener("load", () => {
                canvas.scale(32/200, 32/200);
                canvas.drawImage(img, 0, 0);
            });
            img.src = "./img/Ship.png";

            canvas.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    CheckPlayerWrapScreen() {
        this.rigidBody.CheckWrapScreen();
    }
}

export { Player }