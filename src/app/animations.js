import anime from 'animejs/lib/anime.es';
import c from './config';
import g from './global';
import scss from '../style/export.module.scss';

export default class Animate {
  static drawing(reverse) {
    anime({
      targets: '#drawing path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: c.drawingAnimDur,
      delay: anime.stagger(c.drawingPathDelay),
      direction: reverse ? 'reverse' : null,
    });
  }

  static pageScroll(sections, animate) {
    g.scrollEnded = false;
    const offset = sections[g.currentSection].getBoundingClientRect().top;
    const scrollPos = window.scrollY;
    const documentTop = document.documentElement.clientTop;
    anime({
      targets: [document.documentElement, document.body],
      scrollTop: offset + scrollPos - documentTop,
      duration: animate ? c.scrollDur : 0,
      easing: 'easeInOutQuad',
      complete: () => {
        g.scrollEnded = true;
      },
    });
  }

  static openProject(target) {
    const info = document.querySelector(`.info.${target}`);
    info.style.transition = '0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s';
    info.classList.remove('hidden');
  }

  static closeProjects() {
    document.querySelectorAll('.info').forEach((element) => {
      element.classList.add('hidden');
    });
  }

  static navMarker(btn) {
    anime({
      targets: '.marker',
      scaleY: [
        { value: 0.08, duration: 200 },
        { value: 1, duration: 200, delay: 800 },
      ],
      translateX: [
        {
          value: btn.offsetLeft + btn.offsetWidth / 18,
          duration: 800,
          delay: 200,
        },
      ],
      width: [
        {
          value: btn.offsetWidth - btn.offsetWidth / 9,
          duration: 800,
          delay: 200,
        },
      ],
      easing: 'easeOutElastic(1, .8)',
      duration: 1200,
    });
  }

  static submit() {
    const dur = parseInt(scss.animDur, 10);
    const delay = parseInt(scss.animDelay, 10);
    const formContent = document.querySelector('form .content');
    const formHeight = formContent.getBoundingClientRect().height;
    const submitBtn = document.querySelector('.submit');
    submitBtn.classList.add('clicked');
    formContent.classList.add('th');
    setTimeout(() => {
      formContent.classList.add('tv');
      submitBtn.style.transform = `translate(-50%, calc(1.5rem - ${
        formHeight / 2
      }px)) scale(${scss.scaleY}, ${scss.scaleX})`;
    }, dur + delay);
    setTimeout(() => {
      submitBtn.classList.add('fill');
    }, dur * 2 + delay * 2);
    setTimeout(() => {
      document.querySelector('form').classList.add('animation-ended');
    }, dur * 5);
  }

  static submitEndPositive() {
    document.querySelector('.submit').style.overflow = 'visible';
    document.querySelector('.submit .positive').classList.add('active');
  }

  static submitEndNegative() {
    document.querySelector('.submit').style.overflow = 'visible';
    document.querySelector('.submit .negative').classList.add('active');
  }
}
