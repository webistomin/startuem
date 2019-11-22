import SmoothScroll from 'smooth-scroll';

new SmoothScroll('a[href^="#"]', {
  speed: 600,
  easing: 'easeInOutQuad'
});
