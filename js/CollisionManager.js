const checkForVerticalCollision = (htmlObj, rigidBody) => {
    let platforms = document.getElementsByClassName("platform");
    let objBounds = htmlObj.getBoundingClientRect();
    for (const platform of platforms) {
        let platformBounds = platform.getBoundingClientRect();

        if (objBounds.bottom + 5 >= platformBounds.top &&
            objBounds.bottom <= platformBounds.top &&
            objBounds.right >= platformBounds.left &&
            objBounds.left <= platformBounds.right
        ) {
            htmlObj.style.top = (platformBounds.top - objBounds.height + window.scrollY).toString() + "px";
            return true;
        }
    };
    return false;
};

export { checkForVerticalCollision }