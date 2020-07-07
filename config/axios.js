import Cookies from 'js-cookie';
const axios = require('axios');
console.log(Cookies.get('token'));
const axiosInstance = axios.create({
    baseURL: process.env.environment === 'dev' ? 'http://sifuse.test/api/' : 'http://138.68.43.103/api/',
    //baseURL: 'http://138.68.43.103/api/',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer ' + Cookies.getI
    }
});

export default axiosInstance;
