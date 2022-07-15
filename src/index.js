import './style/style.scss';
import BindAllEvents from './app/listeners';
import Animate from './app/animations';
import Style from './app/style';
import Get from './app/logic';
import g from './app/global';

const sections = document.querySelectorAll('section');

g.nVisible = Get.nProjects();
Animate.pageScroll(sections, false);
Style.homePadding();
BindAllEvents();
