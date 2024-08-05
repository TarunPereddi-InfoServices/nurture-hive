gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Elements
const header = document.querySelector(".header");
const hex = document.querySelectorAll(".hex-wrap.left");
const hex2 = document.querySelectorAll(".hex-wrap.right");
const btn = document.querySelector(".hero-text button")
const logo = document.querySelector(".logo");


gsap.from(header, {y:-400, duration:0.8})
gsap.from(".hero", {scale:0.1,duration:1.5});
gsap.from(hex,{x: -400,stagger:0.3});
gsap.from(hex2,{x: 400,stagger:0.3});

//btn shake
function shakeButton(button) {
  gsap.to(button, {
    x: 5,
    duration: 0.1,
    repeat: 5,
    yoyo: true,
    ease: "power1.inOut"
  });
}

let hasShaken = false;

// Add event listener for hover
btn.addEventListener('mouseenter', () => {
  if (!hasShaken) {
    shakeButton(btn);
    hasShaken = true; 
  }
});

btn.addEventListener('mouseleave', () => {
  hasShaken = false;
});












// Smooth scroll initialization
gsap.to(window, {
  scrollTo: {
    y: 0,
    autoKill: false
  },
  duration: 0.1
});

























// Refresh ScrollTrigger
ScrollTrigger.refresh();