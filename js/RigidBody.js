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
        this.width = width;
        this.height = height;
        this.position = new Vector();
        this.velocity = new Vector();
        this.maxVelocity = new Vector(100, 100);
    }

    AddVelocity(vel) {
        this.velocity.Add(vel);
        this.velocity.Clamp(this.maxVelocity);
    }

    SetVelocity(newVelocity) {
        this.velocity.Set(newVelocity);
    }

    UpdatePosition() {
        this.position.Add(this.velocity);
    }
}

export { RigidBody }