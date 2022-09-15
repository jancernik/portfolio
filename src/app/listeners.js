/* eslint-disable comma-dangle */
import Handle from './handlers';
import Style from './style';

let tStartY = 0;
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

  const emailText = document.querySelector('.email');
  const emailCopyIcon = document.getElementById('copy-email');
  const copyEmail = () => {
    emailCopyIcon.classList.add('copied');
    navigator.clipboard.writeText('jancernik12@gmail.com');
  };
  emailText.addEventListener('click', copyEmail);
  emailCopyIcon.addEventListener('click', copyEmail);

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

  document.getElementById('drawing').addEventListener('mouseenter', () => {
    Handle.showDrawingCredits();
  });

  document.getElementById('drawing').addEventListener('mouseout', () => {
    Handle.hideDrawingCredits();
  });

  window.addEventListener(
    'wheel',
    (e) => {
      Handle.scroll(e);
    },
    { passive: false }
  );

  let normalScroll = false;

  window.addEventListener(
    'touchstart',
    (e) => {
      document.activeElement.blur();
      tStartY = e.changedTouches[0].screenY;
      const infoScreens = [...document.querySelectorAll('.info')];
      if (!infoScreens.every((i) => !i.contains(e.target))) {
        normalScroll = true;
      } else {
        normalScroll = false;
        e.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener(
    'touchend',
    (e) => {
      tEndY = e.changedTouches[0].screenY;
      const dY = tEndY - tStartY;
      if (!normalScroll) {
        e.preventDefault();
        if (tEndY === tStartY) {
          e.target.click();
          e.target.focus();
        } else {
          Handle.swipe(dY);
        }
      }
    },
    { passive: false }
  );

  window.addEventListener(
    'touchmove',
    (e) => {
      tEndY = e.changedTouches[0].screenY;
      const dY = tEndY - tStartY;
      if (normalScroll) {
        const t = document.querySelector('.info:not(.hidden) .content');
        if (dY < 0 && t.offsetHeight + t.scrollTop < t.scrollHeight) {
          if (e.target.classList.contains('content') || t.contains(e.target)) {
            return;
          }
        }
        if (dY > 0 && t.scrollTop > 0) {
          if (e.target.classList.contains('content') || t.contains(e.target)) {
            return;
          }
        }
        e.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener('focusin', (e) => {
    Handle.focus(e);
  });

  window.addEventListener('keydown', (e) => {
    Handle.keyboard(e);
  });

  window.addEventListener('resize', () => {
    Handle.resize();
  });

  window.addEventListener('hashchange', () => {
    Handle.hashCheck();
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => Style.favicon(e.matches));
}
