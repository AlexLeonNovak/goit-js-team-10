import { debounce } from 'lodash';
import ApiService from '../services/api-service';
import { refs } from './refs';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { buildCards } from './build-cards';
import { buildPagination } from './paginator';

const api = new ApiService();
const preloader = new Preloader(refs.preloader);

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.countryList.addEventListener('click', onSearch);
refs.pagination.addEventListener('click', onSearch);

function onSearch(e) {
  e.preventDefault();

  updateApiByEvent(e);

  preloader.showLight();
  api.fetchEvents()
    .then(({ _embedded, page }) => {
      if (!_embedded) {
        throw Error('There are no data to show')
      }
      clearEventList();
      buildCards(_embedded.events);
      buildPagination(page);
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());

}

function updateApiByEvent(e) {
  if (e.target.classList.contains('country-button')
    && e.target.dataset.countryCode
  ) {
    api.countryCode = e.target.dataset.countryCode;
  }
  if (e.target.name
    && e.target.name === 'query'
  ) {
    const q = e.target.value.trim();
    if (!q) {
      toastr.warning('Search query must not be empty');
      api.searchQuery = '';
      return;
    }
    api.searchQuery = q;
  }
  if (e.target.classList.contains('pagination-item')
    && e.target.dataset.page
  ) {
    api.page = e.target.dataset.page
  }
}

function clearInput() {
  refs.input.value = '';
}

function clearEventList() {
  refs.eventList.innerHTML = '';
}
