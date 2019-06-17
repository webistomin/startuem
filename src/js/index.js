/* eslint-disable */
// Set smooth scroll to anchor links

const scrollLinks = new SmoothScroll('a.smooth', {
  speed: 600,
  easing: 'easeInOutQuad',
});

// Get 1vh to fix mobile browsers
let lastHeight = window.innerHeight;
let vh = window.innerHeight * 0.01;
const { body } = document;

document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {

  if (window.innerWidth > window.innerHeight
    || Math.abs(lastHeight - window.innerHeight) > 200) {

    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    lastHeight = window.innerHeight;

  }

}, { passive: true });


// Set animation logic
if (window.matchMedia('(min-width: 1024px)').matches) {

  sal({
    selector: '[data-animation]',
    animateClassName: 'animated',
    threshold: 0.15,
  });

}

document.addEventListener('sal:in', ({ detail }) => {

  const { target } = detail;
  setTimeout(() => {

    target.classList.remove('will-change');

  }, 1000);

});

// Scroll lockers
const { disableBodyScroll } = bodyScrollLock;
const { enableBodyScroll } = bodyScrollLock;
