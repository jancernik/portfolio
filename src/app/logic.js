const bp1 = '900px';
const bp2 = '500px';

export default class Get {
  static nProjects() {
    if (window.matchMedia(`(max-width: ${bp2})`).matches) {
      return 1;
    }
    if (window.matchMedia(`(max-width: ${bp1})`).matches) {
      return 2;
    }
    return 3;
  }
}
