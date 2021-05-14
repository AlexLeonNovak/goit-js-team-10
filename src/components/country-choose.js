import { debounce } from 'lodash';
import ApiService from '../services/api-service';
import dropdown from '../components/dropdown.js';
import { refs } from './refs';;
import countryListTpl from '../templates/country-list.hbs';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { buildCards } from './build-cards';

dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());
refs.countryList = document.querySelector('.country-list');

const api = new ApiService();
const preloader = new Preloader(refs.preloader)

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.countryList.addEventListener('click', onSearch);
console.log(refs);
function onSearch(e) {
  e.preventDefault();

  if (e.target.classList.contains('country-button') && e.target.dataset.countryCode) {
    api.countryCode = e.target.dataset.countryCode;
  }
  if (e.target.name && e.target.name === 'query') {
    const q = e.target.value.trim();
    if (!q) {
      toastr.warning('Search query must not be empty');
      api.searchQuery = '';
      return;
    }
    api.searchQuery = q;
  }

  clearEventList();
  preloader.showLight();
  api.fetchEvents()
    .then(({ _embedded }) => {
      if (!_embedded) {
        throw Error('There are no data to show')
      }
      buildCards(_embedded.events);
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());

}

function reset() {
  refs.input.value = "";
}

function clearEventList() {
  refs.eventList.innerHTML = "";
}
