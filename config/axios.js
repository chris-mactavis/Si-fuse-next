import Cookies from 'js-cookie';
const axios = require('axios');
console.log(Cookies.get('token'));
const axiosInstance = axios.create({
    baseURL: 'http://sifuse.test/api/',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + Cookies.getI
    }
});

export default axiosInstance;