import './sass/main.scss';
//import 'material-design-icons/iconfont/material-icons.css';
import ApiService from './services/api-service';
import cardTpl from './templates/template-card.hbs';
import { eventAdapter } from './utils/event-adapter';

import dropdown from './services/dropdown.js';
import countryListTpl from './templates/country-list.hbs';
import getRefs from './services/get.refs.js';


const refs = getRefs();


dropdown(refs.selectCountryBtn);
refs.selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl());



const refs = {
  eventList: document.querySelector('.card-list'),
  preloader: document.querySelector('.preloader')
}

const api = new ApiService();
let preloader = null;

document.addEventListener('DOMContentLoaded', onLoadedDocument);

function onLoadedDocument() {
  preloader = new Preloader(refs.preloader);
  api.fetchEvents()
    .then(({ _embedded }) => {
      buildCards(_embedded);
      preloader.hide();
    });
}


// api.fetchEventDetail("1kk8v94-GA5YE-w").then(console.log);


function buildCards({events}) {
  console.log(events);
  refs.eventList.innerHTML = cardTpl(events.map(eventAdapter));
}
