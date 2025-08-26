let parallax1 = document.getElementById("parallax-0");
let parallax2 = document.getElementById("parallax-1");
let parallax3 = document.getElementById("parallax-2");
let bodyObj = document.getElementsByTagName("body")[0];

let pageHeight = bodyObj.offsetHeight;
let parallaxHeight = 1024;

parallax1.style.height = parallaxHeight + "px";
parallax2.style.height = parallaxHeight + "px";
parallax3.style.height = parallaxHeight + "px";

parallax1.style.top = "0px";
parallax2.style.top = "0px";
parallax3.style.top = "0px";

let limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;

const updateParallax = (_ => {
    let scrollPosition = window.scrollY;
    parallax1.style.top = ((scrollPosition / limit) * ((pageHeight / parallaxHeight) - 1) * parallaxHeight) + "px";
    parallax2.style.top = ((scrollPosition / limit) * ((pageHeight / (parallaxHeight) - parallax2.style.scale + 0.25)) * parallaxHeight) + "px";
    parallax3.style.top = ((scrollPosition / limit) * ((pageHeight / (parallaxHeight) - parallax3.style.scale + 1)) * parallaxHeight) + "px";
});

document.addEventListener("scroll", updateParallax);