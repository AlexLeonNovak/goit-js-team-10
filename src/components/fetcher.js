import { buildCards } from './build-cards';
import { buildPagination } from './paginator';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { refs } from './refs';
import ApiService from '../services/api-service';
import {scrollWin} from './scroll'


const preloader = new Preloader(refs.preloader);
export const api = new ApiService();

console.dir(refs.eventList);


export const fetch = () => {
  api
    .fetchEvents()
    .then(({ _embedded, page }) => {
      if (!_embedded) {
        throw Error('There are no data to show')
      }
      buildCards(_embedded.events);
      buildPagination(page);

       scrollWin();
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}

