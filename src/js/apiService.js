
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const API_KEY = 'bOxDzXD7U4DYwWKdKJpCszoGXxMX0Go3';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

     }
    // fetchEvent() {
    // return fetch(`${BASE_URL}events.json?keyword=${this.searchQuery}&source=universe&page=${this.page}&size=20&apikey=${API_KEY}`)
    //     .then(response =>
    // response.json(),
    // ).then(({ hits }) => {
        
    //     this.nextPage();
        
    //     return hits;
    // })
    //     .catch(errorNotice);
    // }
    // nextPage() {
    //     this.page += 1;
    // }

    // resetPage() {
    //     this.page = 1;
    // }
    // get query() {
    //     return this.searchQuery;
    // }
    // set query(newQuery) {
    //     this.searchQuery = newQuery;
    // }
}



