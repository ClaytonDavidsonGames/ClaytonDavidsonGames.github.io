class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    Add(addVector) {
        this.x += addVector.x;
        this.y += addVector.y;
    }

    Subtract(addVector) {
        this.x -= addVector.x;
        this.y -= addVector.y;
    }

    ClampMax(maxVelocity) {
        this.x = this.x > maxVelocity.x ? maxVelocity.x : this.x;
        this.y = this.y > maxVelocity.y ? maxVelocity.y : this.y;
    }

    ClampMin(minVelocity) {
        this.x = this.x < minVelocity.x ? minVelocity.x : this.x;
        this.y = this.y < minVelocity.y ? minVelocity.y : this.y;
    }

    Set(newVelocity) {
        this.x = newVelocity.x;
        this.y = newVelocity.y;
    }
}

class RigidBody {
    constructor(width, height) {
        this.bounds = new Vector(width, height);
        this.rotation = 0;
        this.rotationVelocity = 0;
        this.position = new Vector();
        this.velocity = new Vector();
        this.maxVelocity = new Vector(10, 10);
        this.bIsGrounded = false;
        this.friction = 0;
    }

    AddVelocity(vel) {
        this.velocity.Add(vel);
        this.velocity.ClampMax(this.maxVelocity);
    }

    SetVelocity(newVelocity) {
        this.velocity.Set(newVelocity);
    }

    AddForwardVelocity(newVelocity) {
        let xVel = (Math.cos((this.rotation * Math.PI)/180) * newVelocity.x)
                     - (Math.sin((this.rotation * Math.PI)/180) * newVelocity.y);
        let yVel = (Math.sin((this.rotation * Math.PI)/180) * newVelocity.x)
                    + (Math.cos((this.rotation * Math.PI)/180) * newVelocity.y);
        this.velocity.Add(new Vector(xVel, yVel));
    }

    AddRotationVelocity(newVelocity) {
        this.rotationVelocity += newVelocity;
    }

    AddXVelocity(xVel) {
        this.velocity.Add(new Vector(xVel, 0));
        this.velocity.ClampMax(this.maxVelocity);
    }

    SetXVelocity(newXVelocity) {
        this.velocity.Set(new Vector(newXVelocity, this.velocity.y));
    }

    AddYVelocity(yVel) {
        this.velocity.Add(new Vector(0, yVel));
        this.velocity.ClampMax(this.maxVelocity);
    }

    SetYVelocity(newYVelocity) {
        this.velocity.Set(new Vector(this.velocity.x, newYVelocity));
    }

    GetVelocity() {
        return this.velocity;
    }

    UpdateVelocity() {
        this.velocity.Subtract(new Vector(this.friction, this.friction));

        let xVelocityDirection = Math.sign(this.velocity.x);
        let yVelocityDirection = Math.sign(this.velocity.y);
        let xVelocity = Math.abs(this.velocity.x) - this.friction;
        let yVelocity = Math.abs(this.velocity.y) - this.friction;
        if (Math.abs(this.velocity.x) < this.friction) {
            xVelocity = 0;
        }
        else {
            xVelocity *= xVelocityDirection;
        }
        if (Math.abs(this.velocity.y) < this.friction) {
            yVelocity = 0;
        }
        else {
            yVelocity *= yVelocityDirection;
        }
        this.velocity = new Vector(xVelocity, yVelocity);
    }

    UpdateRotation() {
        this.rotation += this.rotationVelocity;

        let rotationDirection = Math.sign(this.rotationVelocity);
        let absRotationVelocity = Math.abs(this.rotationVelocity) - this.friction;
        if (Math.abs(this.rotationVelocity) < this.friction) {
            this.rotationVelocity = 0;
        }
        else {
            this.rotationVelocity = absRotationVelocity * rotationDirection;
        }
    }

    GetRotation() {
        return this.rotation;
    }

    SetRotation(newRotation) {
        this.rotation = newRotation;
    }

    UpdatePosition() {
        this.position.Add(this.velocity);
    }

    SetPosition(newPosition) {
        this.position = newPosition;
    }

    SetXPosition(xPos) {
        this.position.Set(new Vector(xPos, this.position.y));
    }

    SetYPosition(yPos) {
        this.position.Set(new Vector(this.position.x, yPos));
    }
    
    GetPosition() {
        return this.position;
    }

    GetBounds() {
        return this.bounds;
    }

    CheckWrapScreen() {
        let gameZone = document.getElementById("game_zone")
        let position = this.GetPosition();
        let newX = position.x;
        let newY = position.y;

        if (position.x >= gameZone.offsetWidth) newX = 0;
        if (position.x < 0) newX = gameZone.offsetWidth;

        if (position.y >= gameZone.offsetHeight) newY = 0;
        if (position.y < 0) newY = gameZone.offsetHeight;

        this.SetPosition(new Vector(newX, newY));
    }
}

export { 
    RigidBody, 
    Vector
}