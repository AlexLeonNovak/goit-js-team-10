import { debounce } from 'lodash';
import ApiService from '../services/api-service';
import { dropdown } from './dropdown.js';
import { refs } from './refs';
import countryListTpl from '../templates/country-list.hbs';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { buildCards } from './build-cards';
import { buildPagination } from './paginator';

dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());
refs.countryList = document.querySelector('.country-list');

const api = new ApiService();
const preloader = new Preloader(refs.preloader);
let searchEvent;
let countrySelectionEvent;

refs.searchForm.addEventListener('input', event => {
  event.preventDefault();

  searchEvent = event;
  debounce(loadEvents(1), 500);
});
refs.countryList.addEventListener('click', event => {
  event.preventDefault();

  countrySelectionEvent = event;
  loadEvents(1);
});

export function loadEvents(page = 1) {
  if (
    countrySelectionEvent &&
    countrySelectionEvent.target.dataset.countryCode
  ) {
    api.countryCode = countrySelectionEvent.target.dataset.countryCode;
  }

  if (
    searchEvent &&
    searchEvent.target.name &&
    searchEvent.target.name === 'query'
  ) {
    const q = searchEvent.target.value.trim();
    if (!q) {
      toastr.warning('Search query must not be empty');
      api.searchQuery = '';
      return;
    }
    api.searchQuery = q;
  }

  clearEventList();
  preloader.showLight();
  api.page = page;
  api
    .fetchEvents()
    .then(({ _embedded, page }) => {
      if (!_embedded) {
        throw Error('There are no data to show');
      }
      buildCards(_embedded.events);
      buildPagination(page);
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}

function clearInput() {
  refs.input.value = '';
}

function clearEventList() {
  refs.eventList.innerHTML = '';
}
