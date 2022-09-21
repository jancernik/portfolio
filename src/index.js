import './style/style.scss';
import BindAllEvents from './app/listeners';
import Animate from './app/animations';
import Style from './app/style';
import Handle from './app/handlers';

const sections = document.querySelectorAll('section');
const btn = document.querySelector('nav [index="0"]');

Animate.navMarker(btn);
btn.classList.add('active');
window.addEventListener('load', () => {
  Style.favicon(window.matchMedia('(prefers-color-scheme: dark)'));
  const offset = sections[0].getBoundingClientRect().top;
  const scrollPos = window.scrollY;
  const documentTop = document.documentElement.clientTop;
  window.scrollTo({
    top: offset + scrollPos - documentTop,
    behavior: 'instant',
  });
  Handle.hashCheck();
});
Style.homePadding();
Style.projectsParallax();

BindAllEvents();
