import { debounce } from 'lodash';
import ApiService from '../services/api-service';
import dropdown from '../components/dropdown.js';
import getRefs from '../components/refs';
import countryListTpl from '../templates/country-list.hbs';
import cardTpl from '../templates/template-card.hbs';

const refs = getRefs();
const api = new ApiService();

 
refs.searchForm.addEventListener('input', debounce(onInputSearch, 500));

// function onInputSearch(e) {
//     e.preventDefault();
  
//     const form = e.target;
//     const searchEvents = form.value;

//     api.fetchEvents(searchEvents)
//         .then(cardTpl)
//         .finally(setTimeout(reset, 5000));
  
    
// }

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
  fetchQuery();

}
// function onLoadMore() {
// scroll = refs.cardsContainer.offsetHeight;
//   fetchQuery(); 
  
// }
function fetchQuery() {
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



dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());


refs.selectCountryBtn.addEventListener('click', searchInCountry);

function searchInCountry() {
	const countryList = document.querySelector('.country-list');
	countryList.addEventListener('click', getEventInCountry);

	function getEventInCountry(e) {
        //let countryCode = e.target.dataset.countryCode;
        // console.log(countryCode);
api.countryCode = e.target.dataset.countryCode;

        api.fetchEvents(api.countryCode)
            .then(data => {
                data._embedded.events;
                console.log(data._embedded.events);
            })
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


