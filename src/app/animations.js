/* eslint-disable no-unused-expressions */
import anime from 'animejs/lib/anime.es';
import c from './config';
import g from './global';
import scss from '../style/export.module.scss';

export default class Animate {
  static drawing(reverse) {
    document.getElementById('drawing').style.opacity = 1;
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
    animate && this.pageDisplay();
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

  static pageDisplay() {
    if (g.currentSection === 0) {
      this.drawing();
      const a = document.querySelectorAll('#home-sec h1');
      const b = document.querySelectorAll('#home-sec h2');
      const animationTargets = [a, b];
      animationTargets.forEach((group) => {
        group.forEach((el) => {
          el.style.transform = 'translateX(-110%)';
          el.style.opacity = '1';
        });
      });
      anime({
        targets: animationTargets,
        translateX: 0,
        delay: anime.stagger(250, { start: g.lastSection ? 400 : 0 }),
        duration: 1400,
        easing: 'easeOutQuint',
      });
    }
    if (g.currentSection === 1) {
      const pWrapper = document.querySelector('.p-wrapper');
      const wrapper = document.querySelector('.wrapper');
      const profile = document.querySelector('.profile');
      profile.style.opacity = '1';
      setTimeout(() => {
        profile.classList.add('animate');
        wrapper.style.overflow = 'visible';
      }, 1300);
      setTimeout(() => {
        pWrapper.classList.add('animate');
      }, 400);
      profile.style.transform = 'translateX(-110%)';
      anime({
        targets: profile,
        translateX: 'calc(6% + 3px)',
        delay: 600,
        duration: 1200,
        easing: 'easeOutQuint',
      });
      const animationTargets = document.querySelectorAll('.p');
      animationTargets.forEach((el) => {
        el.style.transform = 'translateX(-110%)';
      });
      anime({
        targets: animationTargets,
        translateX: 0,
        delay: anime.stagger(400, { start: 400 }),
        duration: 1500,
        easing: 'easeOutQuint',
      });
    }
    if (g.currentSection === 2) {
      const animationTargets = document.querySelectorAll('.project-item');
      animationTargets.forEach((el) => {
        el.style.transform = `translateY(${g.lastSection > 2 ? '-' : ''}40%)`;
        el.style.opacity = '0';
      });
      anime({
        targets: animationTargets,
        translateY: 0,
        opacity: 1,
        delay: anime.stagger(200, { start: 500 }),
        duration: 1200,
        easing: 'easeOutQuint',
      });
    }
    if (g.lastSection === 1) {
      setTimeout(() => {
        const pWrapper = document.querySelector('.p-wrapper');
        const profile = document.querySelector('.profile');
        const wrapper = document.querySelector('.wrapper');
        wrapper.style.overflow = 'hidden';
        pWrapper.classList.remove('animate');
        profile.classList.remove('animate');
        profile.style.opacity = '0';
      }, c.scrollDur);
    }
    if (g.lastSection === 2) {
      setTimeout(() => {
        const animationTargets = document.querySelectorAll('.project-item');
        animationTargets.forEach((el) => {
          el.style.opacity = '0';
        });
      }, c.scrollDur);
    }
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
    document.querySelector('.submit').classList.add('end');
    document.querySelector('.submit .positive').classList.add('active');
  }

  static submitEndNegative() {
    document.querySelector('.submit').classList.add('end');
    document.querySelector('.submit .negative').classList.add('active');
  }
}
