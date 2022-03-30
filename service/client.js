import axios from 'axios';

let apiUrl = 'https://skyou-cs.dev-lk.mx'; //process.env.VUE_APP_API_URL;

let addSecurity = function(config) {
    config = config || {};
    config.authentication = 'yokozuna';
    return config;
};


let apiClient = {
    get: function(path, config) {
        return axios.get(apiUrl + path, config);
    },
    put: function(path, data, config) {
        return axios.put(apiUrl + path, data, config);
    },
    post: function(path, data, config) {
        return axios.post(apiUrl + path, data, config);
    },
    delete: function(path, config) {
        return axios.delete(apiUrl + path, config);
    },
    secure: {
        get: function(path, config) {
            return axios.get(apiUrl + path, addSecurity(config));
        },
        put: function(path, data, config) {
            return axios.put(apiUrl + path, data, addSecurity(config));
        },
        post: function(path, data, config) {
            return axios.post(apiUrl + path, data, addSecurity(config));
        },
        delete: function(path, config) {
            return axios.delete(apiUrl + path, addSecurity(config));
        }
    },
};

export default apiClient;
