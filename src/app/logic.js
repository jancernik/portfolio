import scss from '../style/export.module.scss';

export default class Get {
  static nProjects() {
    if (window.matchMedia(`(max-width: ${scss.bp2})`).matches) {
      return 1;
    }
    if (window.matchMedia(`(max-width: ${scss.bp1})`).matches) {
      return 2;
    }
    return 3;
  }
}
