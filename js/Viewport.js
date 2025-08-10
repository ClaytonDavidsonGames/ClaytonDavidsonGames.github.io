import { 
    RigidBody, 
    Vector
} from "./RigidBody.js"
import {
    Player
} from "./Player.js"

function lerp( a, b, alpha ) {
    return a + alpha * (b - a)
}

//document.body.innerHTML += document.getElementsByTagName("body")[0].innerHTML;

const UpdateViewportPosition = (player => {
    let playerBounds = player.playerSize;
    let targetX = player.rigidBody.position.x - (window.innerWidth / 2) + (playerBounds.width / 2);
    let targetY = player.rigidBody.position.y - (window.innerHeight / 2) + (playerBounds.height / 2);

    window.scrollTo(
        lerp(window.scrollX, targetX, 0.025), 
        lerp(window.scrollY, targetY, 0.025)
    );
});

export {
    UpdateViewportPosition
}