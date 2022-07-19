import './style/style.scss';
import BindAllEvents from './app/listeners';
import Animate from './app/animations';
import Style from './app/style';
import Get from './app/logic';
import g from './app/global';

const sections = document.querySelectorAll('section');
const btn = document.querySelector('nav [index="0"]');

g.nVisible = Get.nProjects();
Animate.pageScroll(sections, false);
Animate.navMarker(btn);
btn.classList.add('active');
Style.homePadding();
BindAllEvents();
