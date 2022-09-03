import './style/style.scss';
import BindAllEvents from './app/listeners';
import Animate from './app/animations';
import Style from './app/style';
import Get from './app/logic';
import g from './app/global';
import Handle from './app/handlers';

const sections = document.querySelectorAll('section');
const btn = document.querySelector('nav [index="0"]');

g.nVisible = Get.nProjects();
Animate.pageScroll(sections, false);
Animate.navMarker(btn);
btn.classList.add('active');
window.addEventListener('load', () => {
  Style.favicon(window.matchMedia('(prefers-color-scheme: dark)'));
  Handle.hashCheck();
});
Style.homePadding();
Style.projectsParallax();

BindAllEvents();
