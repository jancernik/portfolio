/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
import anime from 'animejs/lib/anime.es';
import c from './config';
import g from './global';
import scss from '../style/export.module.scss';

export default class Animate {
  static drawing(animate, reverse) {
    document.getElementById('drawing').style.opacity = 1;
    anime({
      targets: '#drawing path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: animate ? c.drawingAnimDur : 0,
      delay: animate ? anime.stagger(c.drawingPathDelay) : 0,
      direction: reverse ? 'reverse' : null,
    });
  }

  static showDrawingCredits() {
    if (!window.matchMedia(`(max-width: ${scss.bp2})`).matches) {
      document.querySelector('.credits').style.opacity = '1';
      const letters = document.querySelector('.credits .letters');
      letters.innerHTML = letters.textContent.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      );
      anime({
        targets: '#drawing .letter',
        translateY: ['1.1em', 0],
        easing: 'easeInOutQuint',
        duration: 600,
        delay: anime.stagger(15, { start: 400 }),
      });
    }
  }

  static hideDrawingCredits() {
    document.querySelector('.credits').style.opacity = '0';
  }

  static pageScroll(sections, animate) {
    g.scrollEnded = false;
    const offset = sections[g.currentSection].getBoundingClientRect().top;
    const scrollPos = window.scrollY;
    const documentTop = document.documentElement.clientTop;
    this.pageDisplay(animate);
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

  static pageDisplay(animate) {
    if (g.currentSection === 0) {
      this.drawing(animate);
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
        delay: animate
          ? anime.stagger(250, { start: g.lastSection ? 400 : 0 })
          : 0,
        duration: animate ? 1400 : 0,
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
        delay: animate ? 600 : 0,
        duration: animate ? 1200 : 0,
        easing: 'easeOutQuint',
      });
      const animationTargets = document.querySelectorAll('.p');
      animationTargets.forEach((el) => {
        el.style.transform = 'translateX(-110%)';
      });
      anime({
        targets: animationTargets,
        translateX: 0,
        delay: animate ? anime.stagger(400, { start: 400 }) : 0,
        duration: animate ? 1500 : 0,
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
        delay: animate ? anime.stagger(200, { start: 500 }) : 0,
        duration: animate ? 1200 : 0,
        easing: 'easeOutQuint',
      });
    }
    if (g.currentSection === 3) {
      const target = document.querySelector('form');
      if (!target.classList.contains('animation-ended')) {
        const targetParent = document.querySelector('.contact-container.right');
        const btn = document.querySelector('.submit');
        targetParent.style.overflow = 'hidden';
        targetParent.style.transform = 'translateY(2rem)';
        target.style.transform = 'translateX(-110%)';
        btn.style.transform = 'translate(-50%, 0)';
        btn.style.zIndex = '-1';
        anime({
          targets: target,
          translateX: '0',
          delay: animate ? 400 : 0,
          duration: animate ? 1400 : 0,
          easing: 'easeOutQuint',
        });
        const aEl = document.getElementById('name');
        const bEl = document.getElementById('email');
        const cEl = document.getElementById('message');
        const animationTargets = [aEl, bEl, cEl];
        animationTargets.forEach((el) => {
          el.style.transform = 'translateX(-120%)';
        });
        anime({
          targets: animationTargets,
          translateX: 0,
          delay: animate ? anime.stagger(200, { start: 400 }) : 0,
          duration: animate ? 900 : 0,
          easing: 'easeOutQuint',
        });
        if (animate) {
          setTimeout(() => {
            const t = 'transform 800ms cubic-bezier(0.87, 0.07, 0.28, 1.01)';
            targetParent.style.transition = t;
            btn.style.transition = t;
            targetParent.style.overflow = 'visible';
            btn.style.transform = 'translate(-50%, 4rem)';
            targetParent.style.transform = 'translateY(0)';
          }, 1400);
        } else {
          targetParent.style.transition = 'none';
          btn.style.transition = 'none';
          targetParent.style.overflow = 'visible';
          btn.style.transform = 'translate(-50%, 4rem)';
          targetParent.style.transform = 'translateY(0)';
        }
        setTimeout(() => {
          btn.style.zIndex = '1';
        }, 2200);
      } else {
        target.style.transform = 'scaleY(0)';
        anime({
          targets: target,
          scaleY: 1,
          delay: animate ? 1400 : 0,
          duration: animate ? 320 : 0,
          easing: 'easeOutQuint',
        });
      }
      const title = document.querySelector('.message h2 div');
      const titleParent = document.querySelector('.message h2');
      titleParent.style.overflow = 'hidden';
      title.style.transform = 'translateX(-110%)';
      anime({
        targets: title,
        translateX: 0,
        delay: animate ? 400 : 0,
        duration: animate ? 1400 : 0,
        easing: 'easeOutQuint',
      });
      const text = document.querySelectorAll('.message > div');
      text.forEach((el) => {
        el.style.transform = 'translateY(-60%)';
        el.style.opacity = '0';
      });
      anime({
        targets: text,
        translateY: 0,
        opacity: 1,
        delay: animate ? anime.stagger(300, { start: 1400 }) : 0,
        duration: animate ? 600 : 0,
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
        const projectInfos = document.querySelectorAll('.info');
        projectInfos.forEach((el) => {
          el.classList.add('hidden');
        });
      }, c.scrollDur);
    }
  }

  static openProject(target) {
    const info = document.querySelector(`.info.${target}`);
    info.querySelector('.close-project-info').tabindex = 0;
    info.style.transition = '0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s';
    info.classList.remove('hidden');
    const line = document.querySelector('.info:not(.hidden) .bar .line');
    line.style.transform = 'scaleY(0)';
    const icons = document.querySelectorAll('.info:not(.hidden) i');
    icons.forEach((el) => {
      el.style.transform = 'translateX(120%)';
    });
    anime({
      targets: icons,
      translateX: 0,
      delay: anime.stagger(150, { start: 600 }),
      duration: 300,
      easing: 'easeOutQuad',
      complete: () => {
        anime({
          targets: line,
          scaleY: 1,
          duration: 800,
          easing: 'easeInOutQuart',
        });
      },
    });
  }

  static closeProjects() {
    document.querySelectorAll('.info').forEach((el) => {
      el.querySelector('.close-project-info').tabindex = -1;
      el.classList.add('hidden');
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
    submitBtn.disabled = true;
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
