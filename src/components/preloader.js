export class Preloader {
  constructor(preloaderRef) {
    this.body = document.querySelector('body');
    this.preloader = preloaderRef;
  }

  show() {
    this.body.classList.add('preloader-active');
    this.preloader.style.display = 'block';
  }

  showLight() {
    this.preloader.classList.add('light');
    this.show();
  }

  hide() {
    this.body.classList.remove('preloader-active');
    this.preloader.style.display = 'none';
    this.preloader.classList.remove('light');
  }
}
