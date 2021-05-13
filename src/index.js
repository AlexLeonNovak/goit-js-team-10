import './sass/main.scss';
import toastr from 'toastr';
//import 'material-design-icons/iconfont/material-icons.css';
import ApiService from './services/api-service';
import { eventAdapter } from './utils/event-adapter';
//import dropdown from './components/dropdown';
import getRefs from './components/refs';
import { Preloader } from './components/preloader';


import './components/country-choose.js';


import cardTpl from './templates/template-card.hbs';




const refs = getRefs();


const api = new ApiService();
let preloader = null;

document.addEventListener('DOMContentLoaded', onLoadedDocument);

function onLoadedDocument() {
  preloader = new Preloader(refs.preloader);
  api.fetchEvents()
    .then(({ _embedded }) => buildCards(_embedded))
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide())
  ;
}


// api.fetchEventDetail("1kk8v94-GA5YE-w").then(console.log);


function buildCards({events}) {
  console.log(events);
  refs.eventList.innerHTML = cardTpl(events.map(eventAdapter));
}
