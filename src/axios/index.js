import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

axios.defaults.baseURL = 'http://localhost:8888/api';
// axios.defaults.baseURL = 'https://www.beyondhorizon.top/api/';

NProgress.configure({
	showSpinner: false,
	minimum: 0.2,
	easeing: 'swing',
	speed: 500,
	trickleRate: 0.2,
});

//前置拦截
axios.interceptors.request.use(config => {
	NProgress.start();
	config.headers = { uuid: window.localStorage.getItem('uuid') };
	config.headers = { token: window.localStorage.getItem('token') };
	return config;
});

//后置拦截
axios.interceptors.response.use(response => {
	NProgress.done();
	return response;
});