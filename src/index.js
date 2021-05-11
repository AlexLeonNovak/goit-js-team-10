import "./sass/main.scss";
//import 'material-design-icons/iconfont/material-icons.css';

import ApiService from './services/api.service'
//import cardTpl from './templates/template-card.hbs';


const api = new ApiService();

api.fetchEvents().then(console.log);
api.fetchEventDetail("1kk8v94-GA5YE-w").then(console.log);
