/* Homepage Quote Carousel */
const quoteCarousel = document.querySelector('.quote-carousel');
const quotePagination = document.querySelector('.quote-pagination');

// Initialize new Siema instance for Quote Slider
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
			carouselTimer = setInterval( function(){ mySiema.next(); }, quoteSlideDuration );
		});
    quotePagination.appendChild(pill);
	}
};

// Trigger pagination creator
mySiema.addPagination();
const pills = document.querySelectorAll('.pill');

let carouselTimer =	setInterval( function(){ mySiema.next();	}, quoteSlideDuration );



/* Controls the DONUT tagline spinner when user scrolls */
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
	



const logoAnimationContainer = document.querySelector('.logo-animation');

var animation = bodymovin.loadAnimation({
  container: logoAnimationContainer, // Required
  path: 'http://localhost:3000/lottie-json/donut-text-expand/data.json', // Required
  renderer: 'svg', // Required
  loop: false, // Optional
  autoplay: false, // Optional
});


// Loop through logo animation
function loopLogoAnimation() {

	setTimeout(function(){
		animation.setDirection(1);
		animation.play();
	
		setTimeout(function() {
			animation.setDirection(-1);
			animation.play();

			setTimeout(function() {
				loopLogoAnimation();
			}, 5000);

		}, 3000)
		
	}, 1000)
}

loopLogoAnimation();



