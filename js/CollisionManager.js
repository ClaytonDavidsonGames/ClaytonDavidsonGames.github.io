import { 
    RigidBody, 
    Vector
} from "./RigidBody.js"

const checkForVerticalCollision = (rigidBody) => {
    let platforms = document.getElementsByClassName("platform");
    let objPosition = rigidBody.GetPosition();
    let objBounds = rigidBody.GetBounds();
    let objVelocity = rigidBody.GetVelocity();
    for (const platform of platforms) {
        let platformBounds = platform.getBoundingClientRect();

        if (objPosition.y + objBounds.y + objVelocity.y >= platformBounds.top &&
            objPosition.y + objBounds.y <= platformBounds.top &&
            objPosition.x + objBounds.x >= platformBounds.left &&
            objPosition.x <= platformBounds.right
        ) {
            rigidBody.SetYPosition(platformBounds.top - objBounds.y);
            rigidBody.SetYVelocity(0);
            rigidBody.bIsGrounded = true;
            return true;
        }
        else {
            rigidBody.bIsGrounded = false;
        }
    };
    return false;
};

export { checkForVerticalCollision }