import { debounce } from 'lodash';
import ApiService from '../services/api-service';
import dropdown from '../components/dropdown.js';
import getRefs from '../components/refs';
import countryListTpl from '../templates/country-list.hbs';
import cardTpl from '../templates/template-card.hbs';
import cardTplList from '../templates/contry-list.hbs';

const refs = getRefs();
const api = new ApiService();

 
refs.searchForm.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(e) {
    e.preventDefault();
  clearEventList();
  //imgApiService.resetPage();
  api.searchQuery = e.target.query;
  console.dir(api.searchQuery);
  if (api.query === '') {
      refs.eventList.innerHTML = '';
       //errorNotice();
      return;
    }
  //scroll = 0;
  searchQuery();

}
// function onLoadMore() {
// scroll = refs.eventList.offsetHeight;
//   searchQuery(); 
  
// }
function searchQuery() {
  api.fetchEvents()
        .then(cardTpl)
       .finally(setTimeout(reset, 5000));
          //scrollWin(scroll); 
}


function reset() {
  refs.input.value = "";
}

function clearEventList() {
  refs.eventList.innerHTML = "";
}

// function scrollWin(scroll) {
// window.scrollTo({
//     top: scroll,
//     behavior: "smooth"
// });
// }

dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());


refs.selectCountryBtn.addEventListener('click', searchInCountry);

function searchInCountry() {
	const countryList = document.querySelector('.country-list');
	countryList.addEventListener('click', getEventInCountry);

	function getEventInCountry(e) {
        let countryCode = e.target.dataset.countryCode;
        // console.log(countryCode);
api.countryCode = countryCode;
 
        api.fetchEvents()
            .then(cardTplList)
            .then(changeSearchBtn(e))
            .finally(removeEventLis());
	}
function removeEventLis() {
		countryList.removeEventListener('click', getEventInCountry);
}
}
 
function changeSearchBtn(e) {
    refs.selectCountryBtn.value = e.target.dataset.countryCode;
}


