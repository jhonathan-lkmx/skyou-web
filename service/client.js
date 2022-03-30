import axios from 'axios';
const TOKEN_KEY = 'API_AUTH_TOKEN';
let apiUrl = '';

let addSecurity = function(config) {
    return {
        headers: {
            'x-auth-token': localStorage.getItem(TOKEN_KEY)
        }
    }
};


let apiClient = {
    init: (url) => {
        apiUrl = url;
    },
    get: (path, config) => {
        return axios.get(apiUrl + path, config);
    },
    put: (path, data, config) => {
        return axios.put(apiUrl + path, data, config);
    },
    post: (path, data, config) => {
        return axios.post(apiUrl + path, data, config);
    },
    delete: (path, config) => {
        return axios.delete(apiUrl + path, config);
    },
    secure: {
        get: (path, config) => {
            return axios.get(apiUrl + path, addSecurity(config));
        },
        put: (path, data, config) => {
            return axios.put(apiUrl + path, data, addSecurity(config));
        },
        post: (path, data, config) => {
            return axios.post(apiUrl + path, data, addSecurity(config));
        },
        delete: (path, config) => {
            return axios.delete(apiUrl + path, addSecurity(config));
        }
    },
};

export default apiClient;
