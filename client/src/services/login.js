import axios from 'axios';

export function getAuth() {
    return axios.post('http://127.0.0.1:8000/login/', {
        user: 'admin',
        password: 'asdf1234'
    });
}