import { buildCards } from './build-cards';
import { buildPagination } from './paginator';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { refs } from './refs';
import ApiService from '../services/api-service';

const preloader = new Preloader(refs.preloader);
export const api = new ApiService();

let scroll = 0;


export const fetch = () => {
  api
    .fetchEvents()
    .then(({ _embedded, page }) => {
      if (!_embedded) {
        throw Error('There are no data to show')
      }
      buildCards(_embedded.events);
      buildPagination(page);
       scrollWin(scroll); 
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}

function scrollWin(scroll) {
window.scrollTo({
    top: scroll,
    behavior: "smooth"
});
}