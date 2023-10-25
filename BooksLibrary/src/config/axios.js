import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

// Verifica si hay un token en el LocalStorage al cargar el archivo
const token = localStorage.getItem('token');
if (token) {
    instance.defaults.headers.common['Authorization'] = token;
}

export default instance;
