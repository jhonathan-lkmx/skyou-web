import axios from 'axios';

//======================== AXIOS ========================//
//const API_HOST = 'https://csqa.skyounet.com/cs-api';
//const API_HOST = 'http://skyou-cs.dev-lk.mx/cs-api';
const API_HOST = 'http://localhost:8080/cs-api';


const TOKEN_KEY = 'API_AUTH_TOKEN';

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
            let result = (await axiosInstance.post(`${API_HOST}/auth/login`, { username, password })).data;
            localStorage.setItem( TOKEN_KEY, result.token );
            return result.token;
        },
        logout: async() => {
            await axiosInstance.post(`${API_HOST}/auth/logout`, {}, getAuthConfig());
        },
        getMe: async () => {
            let result = (await axiosInstance.get(`${API_HOST}/auth/me`, getAuthConfig())).data;
            return result;
        },
    },
    products: {
        getDetails: async( productId ) => {
            let result = (await axiosInstance.get(`${API_HOST}/products/item/${productId}`, getAuthConfig())).data;
            return result;
        },
        getByCategoryId: async( categoryId ) => {
            let result = (await axiosInstance.get(`${API_HOST}/products/categories/${categoryId}`, getAuthConfig())).data;
            return result;
        }
    },
    categories: {
        list: async () => {
            let result = (await axiosInstance.get(`${API_HOST}/products/categories`, getAuthConfig())).data;
            return result;
        }
    }
};



export default ({ app }, inject) => {
    inject('csapi', () => csapi);
}
