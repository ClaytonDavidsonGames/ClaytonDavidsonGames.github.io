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

    Clamp(maxVelocity) {
        this.x = this.x > maxVelocity.x ? maxVelocity.x : this.x;
        this.y = this.y > maxVelocity.y ? maxVelocity.y : this.y;
    }

    Set(newVelocity) {
        this.x = newVelocity.x;
        this.y = newVelocity.y;
    }
}

class RigidBody {
    constructor(width, height) {
        this.bounds = new Vector(width, height);
        this.position = new Vector();
        this.velocity = new Vector();
        this.maxVelocity = new Vector(10, 10);
        this.bIsGrounded = false;
    }

    AddVelocity(vel) {
        this.velocity.Add(vel);
        this.velocity.Clamp(this.maxVelocity);
    }

    SetVelocity(newVelocity) {
        this.velocity.Set(newVelocity);
    }

    AddXVelocity(xVel) {
        this.velocity.Add(new Vector(xVel, 0));
        this.velocity.Clamp(this.maxVelocity);
    }

    SetXVelocity(newXVelocity) {
        this.velocity.Set(new Vector(newXVelocity, this.velocity.y));
    }

    AddYVelocity(yVel) {
        this.velocity.Add(new Vector(0, yVel));
        this.velocity.Clamp(this.maxVelocity);
    }

    SetYVelocity(newYVelocity) {
        this.velocity.Set(new Vector(this.velocity.x, newYVelocity));
    }

    GetVelocity() {
        return this.velocity;
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
}

export { 
    RigidBody, 
    Vector
}