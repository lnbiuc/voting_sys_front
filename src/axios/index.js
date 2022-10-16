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

axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
axios.defaults.headers.common['uuid'] = window.localStorage.getItem('uuid');
//前置拦截
axios.interceptors.request.use(config => {
    NProgress.start();
    return config;
});

//后置拦截
axios.interceptors.response.use(response => {
    NProgress.done();
    return response;
});


export function getVotingList() {
    return axios({
        url: './vote/getAll',
        method: 'GET'
    })
}

export function getProjectItems(projectId) {
    return axios({
        url: './vote/items',
        method: 'GET',
        params: {
            projectId: projectId
        }
    })
}

export function getCode(phone) {
    let formData = new FormData
    formData.append("phone", phone)
    return axios({
        url: './user/code',
        method: 'POST',
        data: formData
    })
}

export function usrLogin(phone, code) {
    let formData = new FormData
    formData.append("phone", phone)
    formData.append("code", code)
    return axios({
        url: './user/signup',
        method: 'POST',
        data: formData
    })
}

export function publish(params) {
    axios.defaults.headers.common['token'] = window.localStorage.getItem('token');
    return axios({
        url: './admin/publish',
        method: 'POST',
        data: params
    })
}

export function submitVot(projectId, items) {
    let formData = new FormData
    formData.append("projectId", projectId)
    let itemsArr = new Array(1)
    itemsArr.push(items)
    formData.append("items", itemsArr)
    return axios({
        url: './vote/voting',
        method: 'POST',
        data: formData
    })
}