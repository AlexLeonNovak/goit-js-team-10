import cardTpl from '../templates/template-card.hbs';
import { eventAdapter } from '../utils/event-adapter';
import { refs } from './refs';

export const buildCards = (events) => {
  refs.eventList.innerHTML = cardTpl(events.map(eventAdapter));
}
