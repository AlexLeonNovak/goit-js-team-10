const BASE_URL = 'https://newsuperserver.herokuapp.com/https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'bOxDzXD7U4DYwWKdKJpCszoGXxMX0Go3';

export default class ApiService {
  constructor() {
    this._searchQuery = '';
    this._page = 1;
    this._perPage = 20;
    this._countryCode = '';
  }

  get searchQuery() {
    return this._searchQuery;
  }

  set searchQuery(query) {
    this._page = 1;
    this._searchQuery = query;
  }

  get countryCode() {
    return this._countryCode;
  }

  set countryCode(countryCode) {
    this._countryCode = countryCode;
  }

  set page(page) {
    this._page = page;
  }


  fetchEvents() {
    const params = {
      apikey: API_KEY,
      page: this._page,
      per_page: this._perPage,
    };

    if (this._searchQuery.trim().length){
      params.keyword = this._searchQuery.trim();
    }

    if (this._countryCode.trim().length) {
      params.countryCode = this._countryCode.trim();
    }

    return fetch(`${BASE_URL}events.json?${this.buildParamString(params)}`)
      .then(response => response.json());
  }

  fetchEventDetail(id) {
    const params = {
      apikey: API_KEY
    };

    return fetch(`${BASE_URL}events/${id}.json?${this.buildParamString(params)}`)
      .then(response => response.json());
  }

  buildParamString(params){
    let str = [];
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        str.push(`${key}=${params[key]}`);
      }
    }
    return str.join('&');
  }
}



