import "./sass/main.scss";
//import 'material-design-icons/iconfont/material-icons.css';

import ApiService from './js/apiService.js'
//import cardTpl from './templates/template-card.hbs';


const api = new ApiService();

console.log(api.fetchEvent());
