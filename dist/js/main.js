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

mobileMenuNavItem.forEach(item =>
  item.addEventListener('click', openMobileSubmenu)
);

hamburger.addEventListener('click', e => {
  body.classList.toggle('mobile-nav-is-open');
  body.classList.contains('mobile-nav-is-open')
    ? bodyScrollLock.disableBodyScroll(mobileNavWrapper)
    : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
});

const mq = window.matchMedia('(min-width: 992px)');

function normalize() {
  // Hide Mobile Nav if it's open when user reduces browser width
  if (mq.matches && body.classList.contains('mobile-nav-is-open')) {
    body.classList.remove('mobile-nav-is-open');
    bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  }

  if (!mq.matches) {
    header.classList.remove('form-active');
  }
}

headerCTA.addEventListener('click', (function (e) {
  e.preventDefault();
  header.classList.add('form-active');
}));

window.addEventListener(
  'resize',
  _.throttle(normalize, 100, { trailing: false })
);

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
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const subForms = document.querySelectorAll('#subForm');

if (subForms) {
  // console.log('form(s) exists!')
  const utmSource = getUrlParameter('utm_source');
  const utmCampaign = getUrlParameter('utm_campaign');
  const referrer = document.referrer == '' ? 'Direct' : document.referrer;

  subForms.forEach(form => {
    form.querySelector('input[name=cm-f-yhhllyd]').value = utmSource;
    form.querySelector('input[name=cm-f-ykqhyi]').value = utmCampaign;
    form.querySelector('input[name=cm-f-ykfdjl]').value = referrer;
  });
}

const accordions = document.querySelectorAll('.accordion');

// if (accordions.length) {
//   accordions.forEach(accordion => {
//     const q = accordion.querySelector('.question');
//     const a = accordion.querySelector('.answer');

//     if (accordion.getAttribute('data-expanded') == 'false') {
//       accordion.style.height = `${q.scrollHeight}px`;
//     } else {
//       accordion.classList.add('is-open');
//     }

//     function expand() {
//       a.style.display = 'block';
//       accordion.style.height = `${a.scrollHeight}px`;
//       requestAnimationFrame(function () {
//         accordion.style.height = `${accordion.scrollHeight}px`;
//       });
//       accordion.addEventListener('transitionend', function (e) {
//         accordion.style.height = 'auto';
//         accordion.removeEventListener('transitionend', arguments.callee);
//       });
//       accordion.classList.add('is-open');
//       accordion.setAttribute('data-expanded', 'true');
//     }

//     function collapse() {
//       accordion.style.height = `${accordion.scrollHeight}px`;

//       requestAnimationFrame(function () {
//         accordion.style.height = `${q.scrollHeight}px`;
//         accordion.addEventListener('transitionend', function (e) {
//           a.style.display = 'none';
//           accordion.style.height = 'auto';
//           accordion.removeEventListener('transitionend', arguments.callee);
//         });
//       });
//       accordion.classList.remove('is-open');
//       accordion.setAttribute('data-expanded', 'false');
//     }

//     q.addEventListener('click', function () {
//       if (accordion.getAttribute('data-expanded') == 'true') {
//         requestAnimationFrame(collapse);
//       } else {
//         requestAnimationFrame(expand);
//       }
//     });
//   });
// }

class Accordion {
  constructor(el) {
    this.instance = el;
    this.question = this.instance.querySelector('.question');
    this.answer = this.instance.querySelector('.answer');
    this.question.addEventListener('click', () => {
      if (this.instance.getAttribute('data-expanded') == 'true') {
        this.collapse();
        console.log('collapse');
      } else {
        this.expand();
        console.log('expand');
      }
    });
    this.instance.addEventListener('transitionend', e => {
      if (e.propertyName === 'height') {
        if (this.instance.dataset.expanded === 'true') {
          console.log('expanding finished');
          this.instance.style.height = 'auto';
        } else {
          console.log('collapsing finished');
          this.answer.style.display = 'none';
          requestAnimationFrame(() => {
            this.instance.style.height = 'auto';
          });
        }
      }
    });
  }

  init() {
    if (this.instance.getAttribute('data-expanded') === 'false') {
      this.instance.style.height = `${this.question.scrollHeight}px`;
      this.answer.style.display = 'none';
      // this.collapse();
    } else {
      this.instance.classList.add('is-open');
    }
  }

  expand() {
    this.answer.style.display = 'block';
    this.instance.style.height = `${this.question.scrollHeight}px`;
    requestAnimationFrame(() => {
      this.instance.style.height = `${this.instance.scrollHeight}px`;
    });
    this.instance.classList.add('is-open');
    this.instance.dataset.expanded = 'true';
  }

  collapse() {
    this.instance.style.height = `${this.instance.scrollHeight}px`;
    requestAnimationFrame(() => {
      this.instance.style.height = `${this.question.scrollHeight}px`;
    });

    this.instance.classList.remove('is-open');
    this.instance.dataset.expanded = 'false';
  }
}

accordions.forEach(item => {
  const accordion = new Accordion(item);
  accordion.init();
});
