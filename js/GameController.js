let imageLibrary = {
    player: 0,
    background: 1,
}
let player, asteroid;

function gameInit()
{
    // called once after the engine starts up
    // setup the game
    cameraScale = 2;
    setObjectMaxSpeed(100);

    player = new Player(vec2(0, 0));
    //asteroid = new Asteroid(vec2(50, 50));
}
 
function gameUpdate()
{
    // called every frame at 60 frames per second
    // handle input and update the game state
}
 
function gameUpdatePost()
{
    // called after physics and objects are updated
    // setup camera and prepare for render
    cameraPos = player.pos;
}
 
function gameRender()
{
    // called before objects are rendered
    // draw any background effects that appear behind objects
    const bkg = tile(0, 1500, 1);
    drawTile(vec2(0, 0), vec2(1500, 1115), bkg);
}
 
function gameRenderPost()
{
    // called after objects are rendered
    // draw effects or hud that appear above all objects
}
 
// Startup LittleJS Engine
engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ['/img/SpriteSheet.png', '/img/Space.png']);