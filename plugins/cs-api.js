import axios from 'axios';

//======================== AXIOS ========================//
const TOKEN_KEY = 'API_AUTH_TOKEN';
var apiHost = null;

const axiosInstance = axios.create({
    withCredentials: true
});

function getAuthConfig() {
    return {
        headers: {
            'x-auth-token': localStorage.getItem(TOKEN_KEY)
        }
    }
}

//======================== SERVICE ========================//
const csapi = {
    auth: {
        login: async({username, password}) => {
            let result = (await axiosInstance.post(`${apiHost}/auth/login`, { username, password })).data;
            localStorage.setItem( TOKEN_KEY, result.token );
            return result.token;
        },
        logout: async() => {
            await axiosInstance.post(`${apiHost}/auth/logout`, {}, getAuthConfig());
        },
        getMe: async () => {
            let result = (await axiosInstance.get(`${apiHost}/auth/me`, getAuthConfig())).data;
            return result;
        },
    },
    products: {
        getDetails: async( productId ) => {
            let result = (await axiosInstance.get(`${apiHost}/products/item/${productId}`, getAuthConfig())).data;
            return result;
        },
        getByCategoryId: async( categoryId ) => {
            let result = (await axiosInstance.get(`${apiHost}/products/categories/${categoryId}`, getAuthConfig())).data;
            return result;
        }
    },
    categories: {
        list: async () => {
            let result = (await axiosInstance.get(`${apiHost}/products/categories`, getAuthConfig())).data;
            return result;
        }
    }
};



export default ({ app }, inject) => {
    apiHost = app.$config.apiHost;
    inject('csapi', () => csapi);
}
