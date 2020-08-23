/* Global Menu and Modal Functionality */
const header = document.querySelector('header');
const hamburger = document.getElementById('hamburger');
const headerCTA = document.getElementById('header-subscribe');
const mobileNavWrapper = document.querySelector('.mobile-menu-wrapper');
const newslettersMenuTrigger = document.querySelector(
  '.mobile-menu.main .nav-item.newsletters'
);
const menuBack = document.querySelectorAll('header .menu-back');
const newsletterNavItems = document.querySelectorAll(
  '.mobile-menu.newsletters .nav-item'
);
const megaMenuTabs = document.querySelectorAll('.mega-menu--tabs .tab');
const megaMenuMains = document.querySelectorAll('.mega-menu--main .main');
const body = document.body;

if (header) {
  newslettersMenuTrigger.addEventListener('click', e => {
    body.classList.add('menu-level-2');
  });

  menuBack.forEach(el =>
    el.addEventListener('click', e => {
      if (body.classList.contains('menu-level-2')) {
        body.classList.remove('menu-level-2');
      } else if (body.classList.contains('menu-level-3')) {
        body.classList.remove('menu-level-3');
        body.classList.add('menu-level-2');
      }
    })
  );

  newsletterNavItems.forEach(item =>
    item.addEventListener('click', e => {
      const newsletterToShow = e.currentTarget.dataset.name;
      body.classList.remove('menu-level-2');
      body.classList.add('menu-level-3');

      megaMenuMains.forEach((el, idx, arr) => {
        if (el.classList.contains(newsletterToShow)) {
          arr.forEach(item => item.classList.remove('active'));
          el.classList.add('active');
          el.parentElement.dataset.active = newsletterToShow;
        }
      });
    })
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
      body.classList.remove('menu-level-2');
      body.classList.remove('menu-level-3');

      megaMenuTabs.forEach((el, idx, arr) => {
        idx === 0 ? el.classList.add('active') : el.classList.remove('active');
        if (idx === arr.length - 1) {
          console.log(el.parentElement);
          el.parentElement.parentElement.nextElementSibling.dataset.active =
            'daily';
        }
      });

      megaMenuMains.forEach((el, idx) => {
        el.classList.remove('active');
      });
      megaMenuMains[0].classList.add('active');

      bodyScrollLock.enableBodyScroll(mobileNavWrapper);
    }

    if (!mq.matches) {
      header.classList.remove('form-active');
    }
  }

  mq.addListener(normalize);

  // Header Subscribe button CTA interaction
  headerCTA.addEventListener('click', e => {
    e.preventDefault();
    header.classList.add('form-active');
  });

  function isMobileNavVisible(el) {
    return el.classList.contains('mobile-nav-is-open') ? true : false;
  }

  if (megaMenuTabs.length > 0) {
    megaMenuTabs.forEach((tab, idx, arr) =>
      tab.addEventListener('mouseenter', function () {
        arr.forEach(item => item.classList.remove('active'));
        tab.classList.add('active');

        const name = tab.dataset.tab;

        megaMenuMains.forEach(main => {
          main.classList.remove('active');
          if (main.classList.contains(name)) {
            main.classList.add('active');
            main.parentElement.dataset.active = name;
          }
        });
      })
    );
  }
}
