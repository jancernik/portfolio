import anime from 'animejs/lib/anime.es';
import c from './config';
import g from './global';

let wasMovedRight = false;
let wasMovedLeft = true;
let inView = 0;

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

  static pScrollLeft(projects) {
    if (inView > g.nVisible - 1) {
      document.querySelector('.project-btn.right').classList.remove('hidden');
      wasMovedLeft = true;
      inView -= g.nVisible;
      if (wasMovedRight) {
        wasMovedRight = false;
        inView -= g.nVisible - 1;
      }
      projects[inView].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (inView === 0) {
        document.querySelector('.project-btn.left').classList.add('hidden');
      }
    }
  }

  static pScrollRight(projects) {
    if (inView < projects.length - g.nVisible) {
      document.querySelector('.project-btn.left').classList.remove('hidden');
      wasMovedRight = true;
      inView += g.nVisible;
      if (wasMovedLeft) {
        wasMovedLeft = false;
        inView += g.nVisible - 1;
      }
      projects[inView].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (inView === projects.length - 1) {
        document.querySelector('.project-btn.right').classList.add('hidden');
      }
    }
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
}
