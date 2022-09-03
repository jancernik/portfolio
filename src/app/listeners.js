/* eslint-disable comma-dangle */
import Handle from './handlers';
import Style from './style';

let tStartX = 0;
let tStartY = 0;
let tEndX = 0;
let tEndY = 0;

export default function BindAllEvents() {
  document.querySelector('.hamburger-btn').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('mobile-active');
  });

  document.querySelectorAll('.section-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      Handle.menuClick(btn);
      Handle.menuHover(false);
    });
    btn.addEventListener('mouseover', () => {
      Handle.menuHover(true, btn);
    });
  });

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    Handle.submit();
  });

  document.getElementById('copy-email').addEventListener('click', (e) => {
    e.currentTarget.classList.add('copied');
    navigator.clipboard.writeText('jancernik12@gmail.com');
  });

  document.querySelector('nav').addEventListener('mouseout', () => {
    Handle.menuHover(false);
  });

  document.querySelectorAll('.close-project-info').forEach((item) => {
    item.addEventListener('click', () => {
      Handle.closeProjects();
    });
  });

  document.querySelectorAll('.project-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      Handle.projectClick(e);
    });
  });

  window.addEventListener(
    'wheel',
    (e) => {
      Handle.scroll(e);
    },
    { passive: false }
  );

  window.addEventListener(
    'touchstart',
    (e) => {
      e.preventDefault();
      document.activeElement.blur();
      tStartX = e.changedTouches[0].screenX;
      tStartY = e.changedTouches[0].screenY;
    },
    { passive: false }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      e.preventDefault();
      tEndX = e.changedTouches[0].screenX;
      tEndY = e.changedTouches[0].screenY;
      if (tEndY === tStartY) {
        e.target.click();
        e.target.focus();
      } else {
        const dX = tEndX - tStartX;
        const dY = tEndY - tStartY;
        Handle.swipe(dX, dY);
      }
    },
    { passive: false }
  );

  window.addEventListener('keydown', (e) => {
    Handle.keyboard(e);
  });

  window.addEventListener('resize', () => {
    Handle.resize();
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => Style.favicon(e.matches));
}
