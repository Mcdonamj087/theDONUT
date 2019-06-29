/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2019 
 * MIT License
 * http://link-to-your-git-repo.com
 */

/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/* Global Menu and Modal Functionality */
const hamburger = document.getElementById('hamburger');
const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');
const body = document.body;

hamburger.addEventListener('click', e => {
	body.classList.toggle('mobile-nav-is-open');
  body.classList.contains('mobile-nav-is-open') ? bodyScrollLock.disableBodyScroll(mobileNavWrapper) : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
});

const mq = window.matchMedia('(min-width: 992px)');

function hideMobileNav() {
  if(mq.matches && document.body.classList.contains('mobile-nav-is-open')) {
    document.body.classList.remove('mobile-nav-is-open');
    bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  } else return false;
}

window.addEventListener('resize', _.throttle(hideMobileNav, 100, {trailing: false}));

function isMobileNavVisible(el) {
  return el.classList.contains('mobile-nav-is-open') ? true : false;
}







const quoteCarousel = document.querySelector('.quote-carousel');
const quotePagination = document.querySelector('.quote-pagination');

// New siema instance
const mySiema = new Siema({
	selector: '.quote-carousel',
	onChange: function() {
		const currentSlide = this.currentSlide;
		pills.forEach( pill => pill.classList.remove('active'));
		pills[currentSlide].classList.add('active');
	},
	duration: 400,
	easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
	loop: true
});

const quoteSlideDuration = 10000;

// Add a function that generates pagination to prototype
Siema.prototype.addPagination = function() {
	
	quoteCarousel.firstChild.style.display = 'table';

  for (let i = 0; i < this.innerElements.length; i++) {
		const pill = document.createElement('button');
		pill.classList.add('pill');
		if( i === 0 ) pill.classList.add('active');
    pill.addEventListener('click', _ => {
			this.goTo(i);
			clearTimeout(carouselTimer);
			carouselTimer = setInterval( (function(){ mySiema.next() }), quoteSlideDuration );
		});
    quotePagination.appendChild(pill);
	}
}

// Trigger pagination creator
mySiema.addPagination();
const pills = document.querySelectorAll('.pill');

let carouselTimer =	setInterval( (function(){ mySiema.next()	}), quoteSlideDuration );




// Init ScrollMagic controller
var controller = new ScrollMagic.Controller();

// Build tween for outer
var tweenOuter = TweenMax.to("#tagline-spinner-outer", 1, {rotation: 260, ease: Linear.easeNone});
// Build tween for inner
var tweenInner = TweenMax.to("#tagline-spinner-inner", 1, {rotation: -200, ease: Linear.easeNone});
// Build tween for donut icon
var tweenIcon = TweenMax.to("#tagline-spinner-donut", 1, {rotation: 80, ease: Linear.easeNone});

// build scene for outer
var scene = new ScrollMagic.Scene({duration: 4000})
  .setTween(tweenOuter)
  .addTo(controller);

// build scene for inner
var scene = new ScrollMagic.Scene({duration: 4000})
  .setTween(tweenInner)
  .addTo(controller);

// build scene for icon
var scene = new ScrollMagic.Scene({duration: 4000})
  .setTween(tweenIcon)
	.addTo(controller);
	



const lottieCheckMark = document.querySelector('.lottie-check-mark');

var animation = bodymovin.loadAnimation({
  container: lottieCheckMark, // Required
  path: '/lottie-json/liquid-checkmark-loading.json', // Required
  renderer: 'svg', // Required
  loop: true, // Optional
  autoplay: true, // Optional
})



const formCloseBtns = document.querySelectorAll('._form-thank-you .close-btn');

formCloseBtns.forEach( btn => btn.addEventListener('click', (function(){
	this.parentElement.classList.remove('active');
})))