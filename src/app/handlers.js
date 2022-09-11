import Animate from './animations';
import Style from './style';
import g from './global';
import c from './config';
import Get from './logic';

const sections = document.querySelectorAll('section');

export default class Handle {
  static menuClick(btn) {
    const clickedSection = parseInt(btn.getAttribute('index'), 10);
    if (g.scrollEnded && clickedSection !== g.currentSection) {
      document.querySelector('nav').classList.remove('mobile-active');
      this.changeActiveSection(btn);
      g.lastSection = g.currentSection;
      g.currentSection = clickedSection;
      this.updateHash();
      Animate.pageScroll(sections, true);
      Animate.navMarker(btn);
    }
  }

  static menuHover(hoverIn, btn) {
    const hov = document.querySelector('.hover');
    if (!hoverIn) hov.style.transform = 'scaleX(0)';
    else if (!btn.classList.contains('active')) {
      hov.style.left = `${btn.offsetLeft + btn.offsetWidth / 18}px`;
      hov.style.width = `${btn.offsetWidth - btn.offsetWidth / 9}px`;
      hov.style.transform = 'scaleX(1)';
    }
  }

  static projectClick(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'I') return;
    const logo = e.currentTarget.querySelector('.logo');
    if (logo.classList.contains('conama')) Animate.openProject('conama');
    if (logo.classList.contains('esima')) Animate.openProject('esima');
    if (logo.classList.contains('waldy')) Animate.openProject('waldy');
  }

  static closeProjects() {
    Animate.closeProjects();
  }

  static submit() {
    const form = document.querySelector('form');
    const formData = new FormData(form);
    Animate.submit();
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });

    const submitForm = async () => {
      document.activeElement.blur();
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(object),
        });
        const checkIfAnimationEnded = setInterval(() => {
          const ended = form.classList.contains('animation-ended');
          if (ended) {
            if (response.status === 200) {
              Animate.submitEndPositive();
            } else {
              Animate.submitEndNegative();
            }
            clearInterval(checkIfAnimationEnded);
          }
        }, 100);
      } catch (error) {
        const checkIfAnimationEnded = setInterval(() => {
          const ended = form.classList.contains('animation-ended');
          if (ended) {
            Animate.submitEndNegative();
            clearInterval(checkIfAnimationEnded);
          }
        }, 100);
      }
    };
    submitForm();
  }

  static scroll(e) {
    // Allow zooming with the Ctrl key
    if (!e.ctrlKey) {
      // Allow scrolling on projects
      const infoScreens = [...document.querySelectorAll('.info')];
      if (!infoScreens.every((i) => !i.contains(e.target))) {
        const t = document.querySelector('.info:not(.hidden) .content');
        if (e.deltaY > 0 && t.offsetHeight + t.scrollTop < t.scrollHeight) {
          if (e.target.classList.contains('content') || t.contains(e.target)) {
            return;
          }
          e.preventDefault();
          return;
        }
        if (e.deltaY < 0 && t.scrollTop > 0) {
          if (e.target.classList.contains('content') || t.contains(e.target)) {
            return;
          }
          e.preventDefault();
          return;
        }
        e.preventDefault();
        return;
      }
      e.preventDefault();
      // Vertical scrolling
      if (!e.shiftKey) {
        if (g.scrollEnded) {
          let hasChange = false;
          if (e.deltaY < 0 && g.currentSection > 0) {
            g.lastSection = g.currentSection;
            g.currentSection -= 1;
            this.updateHash();
            hasChange = true;
          } else if (e.deltaY > 0 && g.currentSection < sections.length - 1) {
            g.lastSection = g.currentSection;
            g.currentSection += 1;
            this.updateHash();
            hasChange = true;
          }
          if (hasChange) {
            const query = `nav [index='${g.currentSection}']`;
            const btn = document.querySelector(query);
            this.changeActiveSection(btn);
            Animate.pageScroll(sections, true);
            Animate.navMarker(btn);
          }
        }
      }
    }
  }

  static swipe(dX, dY) {
    // Up
    if (dY - c.tolY > 0) {
      if (g.scrollEnded && g.currentSection > 0) {
        g.lastSection = g.currentSection;
        g.currentSection -= 1;
        this.updateHash();
        const btn = document.querySelector(`nav [index='${g.currentSection}']`);
        this.changeActiveSection(btn);
        Animate.pageScroll(sections, true);
        Animate.navMarker(btn);
      }
    }
    // Down
    if (dY + c.tolY < 0) {
      if (g.scrollEnded && g.currentSection < sections.length - 1) {
        g.lastSection = g.currentSection;
        g.currentSection += 1;
        this.updateHash();
        const btn = document.querySelector(`nav [index='${g.currentSection}']`);
        this.changeActiveSection(btn);
        Animate.pageScroll(sections, true);
        Animate.navMarker(btn);
      }
    }
  }

  static hashCheck() {
    if (g.hashWillChange) return;
    const curHash = window.location.hash;
    g.lastSection = g.currentSection;
    if (curHash === '#home') g.currentSection = 0;
    else if (curHash === '#about') g.currentSection = 1;
    else if (curHash === '#projects') g.currentSection = 2;
    else if (curHash === '#contact') g.currentSection = 3;
    else {
      g.currentSection = 0;
      window.location.hash = 'home';
    }
    const btn = document.querySelector(`nav [index='${g.currentSection}']`);
    this.changeActiveSection(btn);
    Animate.pageScroll(sections, true);
    Animate.navMarker(btn);
  }

  static updateHash() {
    g.hashWillChange = true;
    if (g.currentSection === 0) window.location.hash = 'home';
    if (g.currentSection === 1) window.location.hash = 'about';
    if (g.currentSection === 2) window.location.hash = 'projects';
    if (g.currentSection === 3) window.location.hash = 'contact';
    setTimeout(() => {
      g.hashWillChange = false;
    }, 400);
  }

  static keyboard(e) {
    if (e.key === ' ') {
      // e.preventDefault();
      // if (g.scrollEnded && g.currentSection < sections.length - 1) {
      //   g.currentSection += 1;
      //   Animate.pageScroll(sections, true);
      // }
    }
  }

  static resize() {
    g.nVisible = Get.nProjects();
    Animate.pageScroll(sections, false);
    Style.homePadding();
  }

  static changeActiveSection(btn) {
    if (document.querySelector('button.active')) {
      document.querySelector('button.active').classList.remove('active');
    }
    btn.classList.add('active');
  }
}
