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

const accordions = document.querySelectorAll('.accordion');

if (accordions.length) {
  accordions.forEach(item => {
    const accordion = new Accordion(item);
    accordion.init();
  });
}
