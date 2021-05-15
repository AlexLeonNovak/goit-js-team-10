import { refs } from './refs';

export function dropdown(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('active');

    if (element.classList.contains('active')) {
      refs.countryList.addEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    } else {
      refs.countryList.removeEventListener('click', function (e) {
        closeTargetElm(e.target, element);
      });
    }
  });
}

function closeTargetElm(target, element) {
  if (target !== element) {
    element.classList.remove('active');
    target
      .closest('ul')
      .querySelectorAll('li')
      .forEach(el => el.classList.remove('current'));
    target.classList.add('current');
    element.innerText = target.innerText;
  }
}
