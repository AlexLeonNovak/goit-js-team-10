import { Preloader } from './preloader';
import { buildCards } from './build-cards';
import toastr from 'toastr';
import ApiService from '../services/api-service';
import { refs } from './refs';
import { buildPagination } from './paginator';

document.addEventListener('DOMContentLoaded', onLoadedDocument);

const api = new ApiService();

if (window.matchMedia("(min-width: 480px) and (max-width: 769px)").matches) {
  api.perPage = 21;
}

function onLoadedDocument() {
  const preloader = new Preloader(refs.preloader);
  api
    .fetchEvents()
    .then(({ _embedded, page }) => {
      buildCards(_embedded.events);
      buildPagination(page);
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}
