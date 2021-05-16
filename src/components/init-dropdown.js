import { dropdown } from './dropdown';
import { refs } from './refs';
import countryListTpl from '../templates/country-list.hbs';

dropdown(refs.selectCountryBtn);

const countries = {
  US: 'USA',
  CA: 'Canada',
  UK: 'Great Britain',
  DE: 'Germany',
  FR: 'France',
  PL: 'Poland',
  AU: 'Australia',
  NZ: 'New Zealand',
  DK: 'Denmark',
}

refs.countryList.innerHTML = countryListTpl({countries});
