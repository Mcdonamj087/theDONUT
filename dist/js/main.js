/*!
 * donut-website v0.0.1
 * A description for your project.
 * (c) 2020 
 * MIT License
 * http://link-to-your-git-repo.com
 */

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Accordion = /*#__PURE__*/(function () {
  function Accordion(el) {
    var _this = this;

    _classCallCheck(this, Accordion);

    this.instance = el;
    this.question = this.instance.querySelector('.question');
    this.answer = this.instance.querySelector('.answer');
    this.question.addEventListener('click', (function () {
      if (_this.instance.getAttribute('data-expanded') == 'true') {
        _this.collapse();

        console.log('collapse');
      } else {
        _this.expand();

        console.log('expand');
      }
    }));
    this.instance.addEventListener('transitionend', (function (e) {
      if (e.propertyName === 'height') {
        if (_this.instance.dataset.expanded === 'true') {
          console.log('expanding finished');
          _this.instance.style.height = 'auto';
        } else {
          console.log('collapsing finished');
          _this.answer.style.display = 'none';
          requestAnimationFrame((function () {
            _this.instance.style.height = 'auto';
          }));
        }
      }
    }));
  }

  _createClass(Accordion, [{
    key: "init",
    value: function init() {
      if (this.instance.getAttribute('data-expanded') === 'false') {
        this.instance.style.height = "".concat(this.question.scrollHeight, "px");
        this.answer.style.display = 'none'; // this.collapse();
      } else {
        this.instance.classList.add('is-open');
      }
    }
  }, {
    key: "expand",
    value: function expand() {
      var _this2 = this;

      this.answer.style.display = 'block';
      this.instance.style.height = "".concat(this.question.scrollHeight, "px");
      requestAnimationFrame((function () {
        _this2.instance.style.height = "".concat(_this2.instance.scrollHeight, "px");
      }));
      this.instance.classList.add('is-open');
      this.instance.dataset.expanded = 'true';
    }
  }, {
    key: "collapse",
    value: function collapse() {
      var _this3 = this;

      this.instance.style.height = "".concat(this.instance.scrollHeight, "px");
      requestAnimationFrame((function () {
        _this3.instance.style.height = "".concat(_this3.question.scrollHeight, "px");
      }));
      this.instance.classList.remove('is-open');
      this.instance.dataset.expanded = 'false';
    }
  }]);

  return Accordion;
})();

var accordions = document.querySelectorAll('.accordion');

if (accordions.length) {
  accordions.forEach((function (item) {
    var accordion = new Accordion(item);
    accordion.init();
  }));
}
/* Global Menu and Modal Functionality */


var header = document.querySelector('header');
var hamburger = document.getElementById('hamburger');
var headerCTA = document.getElementById('header-subscribe');
var mobileNavWrapper = document.querySelector('.mobile-menu-wrapper');
var newslettersMenuTrigger = document.querySelector('.mobile-menu.main .nav-item.newsletters');
var menuBack = document.querySelectorAll('header .menu-back');
var newsletterNavItems = document.querySelectorAll('.mobile-menu.newsletters .nav-item');
var megaMenuTabs = document.querySelectorAll('.mega-menu--tabs .tab');
var megaMenuMains = document.querySelectorAll('.mega-menu--main .main');
var body = document.body;

if (header) {
  var normalize = function normalize() {
    // Hide Mobile Nav if it's open when user reduces browser width
    if (mq.matches && body.classList.contains('mobile-nav-is-open')) {
      body.classList.remove('mobile-nav-is-open');
      body.classList.remove('menu-level-2');
      body.classList.remove('menu-level-3');
      megaMenuTabs.forEach((function (el, idx, arr) {
        idx === 0 ? el.classList.add('active') : el.classList.remove('active');

        if (idx === arr.length - 1) {
          console.log(el.parentElement);
          el.parentElement.parentElement.nextElementSibling.dataset.active = 'daily';
        }
      }));
      megaMenuMains.forEach((function (el, idx) {
        el.classList.remove('active');
      }));
      megaMenuMains[0].classList.add('active');
      bodyScrollLock.enableBodyScroll(mobileNavWrapper);
    }

    if (!mq.matches) {
      header.classList.remove('form-active');
    }
  };

  var isMobileNavVisible = function isMobileNavVisible(el) {
    return el.classList.contains('mobile-nav-is-open') ? true : false;
  };

  newslettersMenuTrigger.addEventListener('click', (function (e) {
    body.classList.add('menu-level-2');
  }));
  menuBack.forEach((function (el) {
    return el.addEventListener('click', (function (e) {
      if (body.classList.contains('menu-level-2')) {
        body.classList.remove('menu-level-2');
      } else if (body.classList.contains('menu-level-3')) {
        body.classList.remove('menu-level-3');
        body.classList.add('menu-level-2');
      }
    }));
  }));
  newsletterNavItems.forEach((function (item) {
    return item.addEventListener('click', (function (e) {
      var newsletterToShow = e.currentTarget.dataset.name;
      body.classList.remove('menu-level-2');
      body.classList.add('menu-level-3');
      megaMenuMains.forEach((function (el, idx, arr) {
        if (el.classList.contains(newsletterToShow)) {
          arr.forEach((function (item) {
            return item.classList.remove('active');
          }));
          el.classList.add('active');
          el.parentElement.dataset.active = newsletterToShow;
        }
      }));
    }));
  }));
  hamburger.addEventListener('click', (function (e) {
    body.classList.toggle('mobile-nav-is-open');
    body.classList.contains('mobile-nav-is-open') ? bodyScrollLock.disableBodyScroll(mobileNavWrapper) : bodyScrollLock.enableBodyScroll(mobileNavWrapper);
  }));
  var mq = window.matchMedia('(min-width: 992px)');
  mq.addListener(normalize); // Header Subscribe button CTA interaction

  headerCTA.addEventListener('click', (function (e) {
    e.preventDefault();
    header.classList.add('form-active');
  }));

  if (megaMenuTabs.length > 0) {
    megaMenuTabs.forEach((function (tab, idx, arr) {
      return tab.addEventListener('mouseenter', (function () {
        arr.forEach((function (item) {
          return item.classList.remove('active');
        }));
        tab.classList.add('active');
        var name = tab.dataset.tab;
        megaMenuMains.forEach((function (main) {
          main.classList.remove('active');

          if (main.classList.contains(name)) {
            main.classList.add('active');
            main.parentElement.dataset.active = name;
          }
        }));
      }));
    }));
  }
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
}

var subForms = document.querySelectorAll('#subForm');

if (subForms) {
  // console.log('form(s) exists!')
  var utmSource = getUrlParameter('utm_source');
  var utmCampaign = getUrlParameter('utm_campaign');
  var referrer = document.referrer == '' ? 'Direct' : document.referrer;
  subForms.forEach((function (form) {
    form.querySelector('input[name=cm-f-yhhllyd]').value = utmSource;
    form.querySelector('input[name=cm-f-ykqhyi]').value = utmCampaign;
    form.querySelector('input[name=cm-f-ykfdjl]').value = referrer;
  }));
}