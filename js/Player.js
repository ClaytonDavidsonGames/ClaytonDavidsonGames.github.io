class Player extends EngineObject 
{
    constructor(pos, size, tileInfo, angle)
    {
        super(pos, size, tileInfo, angle);
        // setup object
        this.PLAYER_SIZE = 32;
        this.MAX_SPEED = 8;
        this.TURN_SPEED = 3.2 * (Math.PI / 180);
        this.THRUST = 0.12;
        this.mass = 2;
        this.damping = 0.995;
        this.size = vec2(this.PLAYER_SIZE, this.PLAYER_SIZE);
        this.tileInfo = tile(0, this.PLAYER_SIZE, imageLibrary.player);
        this.setCollision(true, true);
    }
 
    update()
    {
        // update object physics and position
        super.update();
        if (keyIsDown("KeyW")) {
            this.applyForwardThrust();
        }
        if (keyIsDown("KeyA")) {
            this.rotateShip(-1);
        }
        if (keyIsDown("KeyD")) {
            this.rotateShip();
        }
    }

    applyForwardThrust() {
        let xVel = Math.sin(this.angle) * this.THRUST;
        let yVel = Math.cos(this.angle) * this.THRUST;

        this.velocity = this.velocity.add(new vec2(xVel, yVel));
        let totalSpeed = this.velocity.length();
        if (totalSpeed > this.MAX_SPEED) {
            this.velocity = new vec2(
                (this.MAX_SPEED / totalSpeed) * this.velocity.x, 
                (this.MAX_SPEED / totalSpeed) * this.velocity.y
            );
        }
    }

    rotateShip(direction = 1) {
        this.angle += direction * this.TURN_SPEED;
    }
 
    render()
    {
        // draw object as a sprite
        super.render();
        this.drawSprite();
    }

    drawSprite() {
        drawTile(this.pos, this.size, this.tileInfo, new Color(1, 1, 1, 1), this.angle, false, new Color(0, 0, 0, 0), true);
    }
}