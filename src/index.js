import './style/style.scss';

import anime from 'animejs/lib/anime.es';

const svgAnimated = anime({
  targets: '#drawing path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 800,
  delay: anime.stagger(100),
  // direction: 'reverse',
  autoPlay: false,
});

let currentSection = 0;
let scrollEnded = true;
let inView = 0;
let nVisible = 1;
const sections = document.querySelectorAll('section');
const projects = document.querySelectorAll('.project-item');

let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

// function debug() {
//   console.log('nVisible: ', nVisible);
//   console.log('currentSection: ', currentSection);
//   console.log('scrollEnded: ', scrollEnded);
//   console.log('inView: ', inView);
//   setTimeout(debug, 500);
// }
// debug();

function ScrollToY(index, animate) {
  const offset = sections[index].getBoundingClientRect().top;
  const scrollPos = window.scrollY;
  const documentTop = document.documentElement.clientTop;
  anime({
    targets: [document.documentElement, document.body],
    scrollTop: offset + scrollPos - documentTop,
    duration: animate ? 800 : 0,
    easing: 'easeInOutQuad',
    complete: () => {
      scrollEnded = true;
    },
  });
  if (!index && animate) svgAnimated.play();
}

function getVisibleProjects() {
  if (window.matchMedia('(max-width: 500px)').matches) {
    nVisible = 1;
  } else if (window.matchMedia('(max-width: 900px)').matches) {
    nVisible = 2;
  } else {
    nVisible = 3;
  }
}

document.querySelector('.hamburger-btn').addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('mobile-active');
});

getVisibleProjects();
ScrollToY(0, false);

let wasMovedRight = false;
let wasMovedLeft = true;

document.querySelectorAll('.section-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (scrollEnded) {
      scrollEnded = false;
      document.querySelector('nav').classList.remove('mobile-active');
      currentSection = parseInt(btn.getAttribute('index'), 10);
      ScrollToY(currentSection, true);
    }
  });
});

const projectGrid = document.querySelector('.project-grid');

window.addEventListener(
  'wheel',
  (e) => {
    if (!e.ctrlKey) {
      // Allow zooming with the Ctrl key
      e.preventDefault();
      if (!e.shiftKey) {
        // Vertical scrolling
        if (scrollEnded) {
          scrollEnded = false;
          if (e.deltaY < 0 && currentSection > 0) currentSection -= 1;
          else if (e.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection += 1;
          }
          ScrollToY(currentSection, true);
        }
      } else if (projectGrid.contains(e.target)) {
        // Horizontal scrolling on project grid
        if (e.deltaY < 0 && inView > nVisible - 1) {
          wasMovedLeft = true;
          inView -= nVisible;
          if (wasMovedRight) {
            wasMovedRight = false;
            inView -= nVisible - 1;
          }
        } else if (e.deltaY > 0 && inView < projects.length - nVisible) {
          wasMovedRight = true;
          inView += nVisible;
          if (wasMovedLeft) {
            wasMovedLeft = false;
            inView += nVisible - 1;
          }
        }
        projects[inView].scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  },
  { passive: false },
);

window.addEventListener('resize', () => {
  ScrollToY(currentSection, false);
  getVisibleProjects();
});

function handleGesture(event) {
  const tol = 30;
  const dX = touchendX - touchstartX;
  const dY = touchendY - touchstartY;

  if (touchendY === touchstartY) {
    // console.log('Tap');
    event.target.click();
  }
  if (dX + tol < 0) {
    // console.log('Swiped Right');
    if (currentSection === 2 && inView < projects.length - nVisible) {
      wasMovedRight = true;
      inView += nVisible;
      if (wasMovedLeft) {
        wasMovedLeft = false;
        inView += nVisible - 1;
      }
      projects[inView].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
  if (dX - tol > 0) {
    // console.log('Swiped Left');
    if (currentSection === 2 && inView > nVisible - 1) {
      wasMovedLeft = true;
      inView -= nVisible;
      if (wasMovedRight) {
        wasMovedRight = false;
        inView -= nVisible - 1;
      }
      projects[inView].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
  if (dY + tol < 0) {
    // console.log('Swiped Down');
    if (scrollEnded) {
      scrollEnded = false;
      if (currentSection < sections.length - 1) {
        currentSection += 1;
      }
      ScrollToY(currentSection, true);
    }
  }
  if (dY - tol > 0) {
    // console.log('Swiped Up');
    if (scrollEnded) {
      scrollEnded = false;
      if (currentSection > 0) {
        currentSection -= 1;
      }
      ScrollToY(currentSection, true);
    }
  }
}

window.addEventListener(
  'touchstart',
  (event) => {
    event.preventDefault();
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
  },
  { passive: false },
);

window.addEventListener(
  'touchend',
  (event) => {
    event.preventDefault();
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;

    handleGesture(event);
  },
  { passive: false },
);
