//import { getEvent } from '../services/api-service.js';
import ApiService from '../services/api-service';
import dropdown from '../components/dropdown.js';
import getRefs from '../components/refs';
import countryListTpl from '../templates/country-list.hbs';

const refs = getRefs();
const api = new ApiService();

    
dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());


refs.selectCountryBtn.addEventListener('click', searchInCountry);

function searchInCountry() {
	const countryList = document.querySelector('.country-list');
	countryList.addEventListener('click', getEventInCountry);

	function getEventInCountry(e) {
        let countryCode = e.target.dataset.countryCode;
        console.log(countryCode);

        api.fetchEventDetail(countryCode)
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


