import { 
    RigidBody, 
    Vector
} from "./RigidBody.js"

class Asteroid {
    constructor() {
        this.MIN_SIZE = 25;
        this.MAX_SIZE = 50;
        this.MIN_SPEED = 0.5;
        this.MAX_SPEED = 3;
        this.size = this.MIN_SIZE + (Math.random() * (this.MAX_SIZE - this.MIN_SIZE));
        this.speed = this.MIN_SPEED + (Math.random() * (this.MAX_SPEED - this.MIN_SPEED));
        this.rigidBody = new RigidBody(this.size, this.size);
        this.asteroidHTML = this.CreateAsteroidHTML();

        this.rigidBody.SetRotation(Math.round(Math.random() * 360));
        this.rigidBody.AddForwardVelocity(new Vector(this.speed, 0));
    }

    CreateAsteroidHTML() {
        const asteroidHTML = document.createElement("div");
        asteroidHTML.class = "asteroid";
        asteroidHTML.style.width = this.size + "px";
        asteroidHTML.style.height = this.size + "px";
        console.log(this.size + "px");
        asteroidHTML.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
        asteroidHTML.style.position = "absolute";
        asteroidHTML.style.zIndex = 1;
        document.getElementsByTagName("body")[0].appendChild(asteroidHTML);
        console.log(asteroidHTML);
        return asteroidHTML;
    }

    UpdateAsteroidPhysics() {
        this.rigidBody.UpdateRotation();
        this.rigidBody.UpdateVelocity();
        this.rigidBody.UpdatePosition();
    }

    UpdateAsteroidSprite() {
        let position = this.rigidBody.GetPosition();
        let asteroidBounds = this.asteroidHTML.getBoundingClientRect();
        this.asteroidHTML.style.left = position.x.toString() + "px";
        this.asteroidHTML.style.top = position.y.toString() + "px";
        this.asteroidHTML.style.rotate = this.rigidBody.rotation + "deg";
    }

    CheckAsteroidWrapScreen() {
        this.rigidBody.CheckWrapScreen();
    }
}

export { Asteroid }