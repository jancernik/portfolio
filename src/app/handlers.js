import Animate from './animations';
import Style from './style';
import g from './global';
import c from './config';
import Get from './logic';

const projectGrid = document.querySelector('.project-grid');
const projects = document.querySelectorAll('.project-item');
const sections = document.querySelectorAll('section');

export default class Handle {
  static menuClick(btn) {
    if (g.scrollEnded) {
      document.querySelector('nav').classList.remove('mobile-active');
      this.changeActiveSection(btn);
      g.currentSection = parseInt(btn.getAttribute('index'), 10);
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

  static projectClick(btn) {
    if (btn.classList.contains('left')) {
      Animate.pScrollLeft(projects);
    } else {
      Animate.pScrollRight(projects);
    }
  }

  static scroll(e) {
    // Allow zooming with the Ctrl key
    if (!e.ctrlKey) {
      e.preventDefault();
      // Vertical scrolling
      if (!e.shiftKey) {
        if (g.scrollEnded) {
          if (e.deltaY < 0 && g.currentSection > 0) {
            g.currentSection -= 1;
          } else if (e.deltaY > 0 && g.currentSection < sections.length - 1) {
            g.currentSection += 1;
          }
          const query = `nav [index='${g.currentSection}']`;
          const btn = document.querySelector(query);
          this.changeActiveSection(btn);
          Animate.pageScroll(sections, true);
          Animate.navMarker(btn);
        }
        // Horizontal scrolling
      } else if (projectGrid.contains(e.target)) {
        if (e.deltaY < 0) {
          Animate.pScrollLeft(projects);
        } else if (e.deltaY > 0) {
          Animate.pScrollRight(projects);
        }
      }
    }
  }

  static swipe(dX, dY) {
    // Left
    if (dX - c.tolX > 0) {
      if (g.currentSection === 2) {
        Animate.pScrollLeft(projects);
      }
    }
    // Right
    if (dX + c.tolX < 0) {
      if (g.currentSection === 2) {
        Animate.pScrollRight(projects);
      }
    }
    // Up
    if (dY - c.tolY > 0) {
      if (g.scrollEnded && g.currentSection > 0) {
        g.currentSection -= 1;
        const btn = document.querySelector(`nav [index='${g.currentSection}']`);
        this.changeActiveSection(btn);
        Animate.pageScroll(sections, true);
        Animate.navMarker(btn);
      }
    }
    // Down
    if (dY + c.tolY < 0) {
      if (g.scrollEnded && g.currentSection < sections.length - 1) {
        g.currentSection += 1;
        const btn = document.querySelector(`nav [index='${g.currentSection}']`);
        this.changeActiveSection(btn);
        Animate.pageScroll(sections, true);
        Animate.navMarker(btn);
      }
    }
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
