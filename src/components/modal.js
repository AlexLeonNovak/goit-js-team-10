import modalTemplate from '../templates/modal.hbs';
import { refs } from './refs';
import ApiService from '../services/api-service';
const api = new ApiService();
import { eventAdapter } from '../utils/event-adapter';

refs.eventList.addEventListener('click', eventDetailsHandler);

function eventDetailsHandler(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  const eventId = event.target.dataset.id;
  api.fetchEventDetail(eventId).then(data => {
    updateModalMarkup(data);
  });
  onOpenModal();
}

function updateModalMarkup(data) {
  refs.modalRef.innerHTML = modalTemplate(eventAdapter(data));
}

function onOpenModal() {
  refs.backdropRef.classList.remove('is-hidden');
}
