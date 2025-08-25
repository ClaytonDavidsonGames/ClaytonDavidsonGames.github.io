class Asteroid extends EngineObject 
{
    constructor(pos, size, tileInfo, angle)
    {
        super(pos, size, tileInfo, angle);
        // setup object
        this.MIN_SIZE = 25;
        this.MAX_SIZE = 50;
        this.MIN_SPEED = 0.5;
        this.MAX_SPEED = 1;
        this.sideLength = this.MIN_SIZE + (Math.random() * (this.MAX_SIZE - this.MIN_SIZE));
        this.angle = (Math.random() * 360) * (Math.PI / 180);
        this.applyForwardVelocity(this.MIN_SPEED + (Math.random() * (this.MAX_SPEED - this.MIN_SPEED)));
        this.mass = this.sideLength / 10;
        this.size = vec2(this.sideLength, this.sideLength);
        this.setCollision(true, true);
    }
 
    update()
    {
        // update object physics and position
        super.update();
    }

    applyForwardVelocity(forwardSpeed) {
        let xVel = Math.sin(this.angle) * forwardSpeed;
        let yVel = Math.cos(this.angle) * forwardSpeed;
        this.velocity = this.velocity.add(new vec2(xVel, yVel));
    }

    render()
    {
        // draw object as a sprite
        super.render();
    }
}