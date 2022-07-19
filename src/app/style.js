import scss from '../style/export.module.scss';

export default class Style {
  static homePadding() {
    if (window.matchMedia(`(max-width: ${scss.bp2})`).matches) {
      const h = document.getElementById('home');
      const d = document.getElementById('drawing');
      const t = document.querySelector('.title');
      const p = (h.offsetHeight - d.offsetHeight - t.offsetHeight) / 2;
      document.querySelector('#home').style.paddingTop = `${p}px`;
    }
    else {
      document.querySelector('#home').style.paddingTop = '0';
    }
  }
}
