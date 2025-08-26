let portals = Array.from(document.getElementsByClassName("portal"));

portals.forEach(p => {
    p.style.animationDelay = -100 * Math.random() + "s";
});

let portalFrames = Array.from(document.getElementsByClassName("portal-frame"));

portalFrames.forEach(p => {
    p.style.animationDelay = -100 * Math.random() + "s";
});