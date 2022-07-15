import Handle from './handlers';

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
    });
  });

  window.addEventListener('wheel', (e) => {
    Handle.scroll(e);
  }, { passive: false });

  window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    tStartX = e.changedTouches[0].screenX;
    tStartY = e.changedTouches[0].screenY;
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    e.preventDefault();
    tEndX = e.changedTouches[0].screenX;
    tEndY = e.changedTouches[0].screenY;
    if (tEndY === tStartY) {
      e.target.click();
    } else {
      const dX = tEndX - tStartX;
      const dY = tEndY - tStartY;
      Handle.swipe(dX, dY);
    }
  }, { passive: false });

  window.addEventListener('resize', () => {
    Handle.resize();
  });
}