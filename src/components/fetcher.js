import { buildCards } from './build-cards';
import { buildPagination } from './paginator';
import toastr from 'toastr';
import { Preloader } from './preloader';
import { refs } from './refs';

const preloader = new Preloader(refs.preloader);

export const fetch = (api) => {
  api
    .fetchEvents()
    .then(({ _embedded, page }) => {
      if (!_embedded) {
        throw Error('There are no data to show')
      }
      buildCards(_embedded.events);
      buildPagination(page);
    })
    .catch(error => toastr.error(error.message))
    .finally(() => preloader.hide());
}
