let parallax1 = document.getElementById("parallax-0");
let parallax2 = document.getElementById("parallax-1");
let parallax3 = document.getElementById("parallax-2");
let bodyObj = document.getElementsByTagName("body")[0];

let pageHeight = bodyObj.offsetHeight;
let parallaxHeight = 2048;

parallax1.style.height = parallaxHeight + "px";
parallax2.style.height = parallaxHeight + "px";
parallax3.style.height = parallaxHeight + "px";

parallax1.style.top = "0px";
parallax2.style.top = "0px";
parallax3.style.top = "0px";

let limit = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;

const updateParallax = (_ => {
    let scrollPosition = window.scrollY;
    parallax1.style.top = (((scrollPosition / limit) * (pageHeight + (parallaxHeight / 2))) * 0.5) + "px";
    parallax2.style.top = (((scrollPosition / limit) * (pageHeight + (parallaxHeight / 2))) * (0.42)) + "px";
    parallax3.style.top = (((scrollPosition / limit) * (pageHeight + (parallaxHeight / 2))) * (0.175)) + "px";
});

document.addEventListener("scroll", updateParallax);