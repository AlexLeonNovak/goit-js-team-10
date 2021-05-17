import modalTemplate from '../templates/modal.hbs';
import { refs } from './refs';
import { eventAdapter } from '../utils/event-adapter';
import { Preloader } from './preloader';
import toastr from 'toastr';
import { api, fetch } from './fetcher';

const preloader = new Preloader(refs.preloader);

refs.eventList.addEventListener('click', onCardClick);
refs.backdropModal.addEventListener('click', onBackdropClick)

function onCardClick(e) {
  const elem = e.target.closest('li');
  if (!elem) {
    return;
  }
  const eventId = elem.dataset.id;
  preloader.showLight();
  api.fetchEventDetail(eventId)
    .then(data => {
      updateModalMarkup(data);
      openModal();
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}

function onBackdropClick(e) {
  const closeBtn = e.target.closest('.modal-close-btn');
  if (e.target === e.currentTarget || closeBtn) {
    closeModal();
  }
  if (e.target.classList.contains('modal-btn')) {
    onModalBtnClick(e.target);
  }
}

function updateModalMarkup(data) {
  refs.modal.innerHTML = modalTemplate(eventAdapter(data));
}

function openModal() {
  refs.backdropModal.classList.remove('is-hidden');
  refs.body.classList.add('modal-opened');
  window.addEventListener('keydown', onWindowKeydown);
}

function closeModal() {
  refs.backdropModal.classList.add('is-hidden');
  refs.body.classList.remove('modal-opened');
  window.removeEventListener('keydown', onWindowKeydown);
}

function onWindowKeydown(e) {
  const KEYCODE_ESC = 'Escape';
  if (KEYCODE_ESC === e.code) {
    closeModal();
  }
}

function onModalBtnClick(elem) {
  closeModal()
  api.clear();
  api.searchQuery = elem.dataset.author;
  preloader.showLight();
  fetch();
}
