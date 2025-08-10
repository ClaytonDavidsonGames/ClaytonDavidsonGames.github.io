class EPlayerInputs {
    static #_ROTATELEFT = 0;
    static #_ROTATERIGHT = 1;
    static #_ADDTHRUST = 2;

    static get ROTATELEFT() { return this.#_ROTATELEFT;}
    static get ROTATERIGHT() { return this.#_ROTATERIGHT;}
    static get ADDTHRUST() { return this.#_ADDTHRUST;}
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
    "a", //ROTATE LEFT
    "d", //ROTATE RIGHT
    "w" //ADD THRUST
]

let playerActions = [
    new Action(keyCodes[EPlayerInputs.ROTATELEFT], "rotateleft"),
    new Action(keyCodes[EPlayerInputs.ROTATERIGHT], "rotateright"),
    new Action(keyCodes[EPlayerInputs.ADDTHRUST], "addthrust")
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
    console.log(e.key);
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