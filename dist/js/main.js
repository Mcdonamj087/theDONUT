/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2020 
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
const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const headerCTA = document.getElementById('header-subscribe');
const mobileNavWrapper = document.querySelector('.mobile-nav-wrapper');
const mobileMenuNavItem = document.querySelectorAll('#mobile-menu .nav-item');
const body = document.body;

function openMobileSubmenu() {
  this.classList.toggle('is-open');
}

mobileMenuNavItem.forEach( item => item.addEventListener('click', openMobileSubmenu));

hamburger.addEventListener('click', e => {
	body.classList.toggle('mobile-nav-is-open');
  body.classList.contains('mobile-nav-is-open') ? bodyScrollLock.disableBodyScroll(mobileNavWrapper) : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
});

const mq = window.matchMedia('(min-width: 992px)');

function normalize() {
  // Hide Mobile Nav if it's open when user reduces browser width
  if(mq.matches && body.classList.contains('mobile-nav-is-open')) {
    body.classList.remove('mobile-nav-is-open');
    bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  } 

  if(!mq.matches) {
    header.classList.remove('form-active');
  }
}

headerCTA.addEventListener('click', (function(e){
  e.preventDefault();
  header.classList.add('form-active');
}))

window.addEventListener('resize', _.throttle(normalize, 100, {trailing: false}));

function isMobileNavVisible(el) {
  return el.classList.contains('mobile-nav-is-open') ? true : false;
}



/*****************************************
  Inject UTM params into CM custom fields
******************************************/

/* Get url parameters helper function
   https://davidwalsh.name/query-string-javascript 
*/
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const subForms = document.querySelectorAll('#subForm');

if(subForms) {
  // console.log('form(s) exists!')
  const utmSource = getUrlParameter('utm_source');
  const utmCampaign = getUrlParameter('utm_campaign');
  const referrer = document.referrer == "" ? 'Direct' : document.referrer;

  subForms.forEach( form => {
    form.querySelector('input[name=cm-f-yhhllyd]').value = utmSource;
    form.querySelector('input[name=cm-f-ykqhyi]').value = utmCampaign;
    form.querySelector('input[name=cm-f-ykfdjl]').value = referrer;
  });
}