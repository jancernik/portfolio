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

document.querySelector('form button').addEventListener('click', (e) => {
  e.preventDefault();
  // e.target.classList.toggle('click');
  const formContent = document.querySelector('form .content');
  const formHeight = formContent.getBoundingClientRect().height;
  e.target.style.transform = `translate(-50%, calc(calc(100% - 1.2rem) - ${formHeight / 2}px))`;
  formContent.classList.toggle('sh');
  setTimeout(() => {
    formContent.classList.toggle('sv');
  }, 1200);
  setTimeout(() => {
    e.target.classList.toggle('hide');
  }, 900);
});
