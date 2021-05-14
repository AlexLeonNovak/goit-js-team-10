import { Preloader } from './preloader';
import { buildCards } from './build-cards';
// import '../utils/handlebars-datetime-formatter'
import toastr from 'toastr';
import ApiService from '../services/api-service';
import { refs } from './refs';

document.addEventListener('DOMContentLoaded', onLoadedDocument);

const api = new ApiService();

function onLoadedDocument() {
  const preloader = new Preloader(refs.preloader);
  api.fetchEvents()
    .then(({ _embedded }) => buildCards(_embedded.events))
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide())
  ;
}
