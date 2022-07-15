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
      g.currentSection = parseInt(btn.getAttribute('index'), 10);
      Animate.pageScroll(sections, true);
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
          Animate.pageScroll(sections, true);
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
        Animate.pageScroll(sections, true);
      }
    }
    // Down
    if (dY + c.tolY < 0) {
      if (g.scrollEnded && g.currentSection < sections.length - 1) {
        g.currentSection += 1;
        Animate.pageScroll(sections, true);
      }
    }
  }

  static resize() {
    g.nVisible = Get.nProjects();
    Animate.pageScroll(sections, false);
    Style.homePadding();
  }
}
