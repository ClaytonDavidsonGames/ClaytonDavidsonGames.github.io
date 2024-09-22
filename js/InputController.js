class EPlayerInputs {
    static #_MOVELEFT = 0;
    static #_MOVERIGHT = 1;
    static #_JUMP = 2;

    static get MOVELEFT() { return this.#_MOVELEFT;}
    static get MOVERIGHT() { return this.#_MOVERIGHT;}
    static get JUMP() { return this.#_JUMP;}
}

class Action {
    constructor(key, eventName, isActive=false) {
        this.key = key;
        this.eventName = eventName;
        this.startEventName = this.eventName + "start";
        this.activeEventName = this.eventName + "active";
        this.endEventName = this.eventName + "end";
        this.isActive = isActive;
        this.startTrigger = true;
        this.endTrigger = true;
        this.actionEventStart = new Event(this.startEventName);
        this.actionEventActive = new Event(this.activeEventName);
        this.actionEventEnd = new Event(this.endEventName);
    }
}

let keyCodes = [
    "a", //MOVE LEFT
    "d", //MOVE RIGHT
    "w" //JUMP
]

let playerActions = [
    new Action(keyCodes[EPlayerInputs.MOVELEFT], "moveleft"),
    new Action(keyCodes[EPlayerInputs.MOVERIGHT], "moveright"),
    new Action(keyCodes[EPlayerInputs.JUMP], "jump")
];

const ModifyActionStatus = (action, state) => {
    action.isActive = state;
    if (state) {
        if (!action.endTrigger) action.endTrigger = true;
    }
    else {
        if (!action.startTrigger) action.startTrigger = true;
    }
};

const onKeyDown = (e => {
    if (keyCodes.indexOf(e.key) != -1) {
        ModifyActionStatus(playerActions[keyCodes.indexOf(e.key)], true);
    }
});

const onKeyUp = (e => {
    if (keyCodes.indexOf(e.key) != -1) {
        ModifyActionStatus(playerActions[keyCodes.indexOf(e.key)], false);
    }
})

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

export { 
    EPlayerInputs,
    playerActions
}