export default class Style {
  static homePadding() {
    const d = document.getElementById('drawing');
    const t = document.querySelector('.title');
    const p = (window.innerHeight - d.offsetHeight - t.offsetHeight) / 2;
    document.querySelector('#home').style.paddingTop = `${p}px`;
  }
}
