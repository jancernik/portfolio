import scss from '../style/export.module.scss';
import g from './global';

export default class Style {
  static favicon(isDark) {
    const lightThemeIcon = document.getElementById('light-theme-icon');
    const darkThemeIcon = document.getElementById('dark-theme-icon');
    if (isDark) {
      lightThemeIcon.parentNode.removeChild(lightThemeIcon);
      document.head.append(darkThemeIcon);
    } else {
      darkThemeIcon.parentNode.removeChild(darkThemeIcon);
      document.head.append(lightThemeIcon);
    }
  }

  static homePadding() {
    if (window.matchMedia(`(max-width: ${scss.bp2})`).matches) {
      const h = document.getElementById('home-sec');
      const d = document.getElementById('drawing');
      const t = document.querySelector('.title');
      const p = (h.offsetHeight - d.offsetHeight - t.offsetHeight) / 2;
      document.querySelector('#home-sec').style.paddingTop = `${p}px`;
    } else {
      document.querySelector('#home-sec').style.paddingTop = '0';
    }
  }

  static projectsParallax() {
    window.addEventListener('mousemove', (e) => {
      if (g.currentSection === 2 && g.scrollEnded) {
        const infoScreens = [...document.querySelectorAll('.info')];
        if (!infoScreens.every((i) => i.classList.contains('hidden'))) return;
        document.querySelectorAll('.project-item').forEach((item) => {
          const imgX = item.getBoundingClientRect().left + item.offsetWidth / 2;
          const imgY = item.getBoundingClientRect().top + item.offsetHeight / 2;
          const img = item.querySelector('img');
          const x = e.clientX - imgX;
          const y = e.clientY - imgY;
          img.style.transform = `translate(${x / -scss.imgParallax}%, ${
            y / -scss.imgParallax
          }%) scale(1.1)`;
        });
      }
    });
  }
}
