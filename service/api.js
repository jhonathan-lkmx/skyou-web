import client from '@/service/client';
const TOKEN_KEY = 'API_AUTH_TOKEN';

const api = {
    init: (url) => {
        client.init(url);
    },
    auth: {
        login: async({username, password}) => {
            let result = (await client.post(`/auth/login`, { username, password })).data;
            
            if(result.token) 
                localStorage.setItem( TOKEN_KEY, result.token );
            else
                throw 'access-error';
            
            return result.token;
        },
        getMe: async () => {
            try {
                let result = (await client.secure.get(`/central-api/auth/me`)).data;
                return result;
            } catch( error ) {
                localStorage.removeItem( TOKEN_KEY);
                throw 'NOT_LOADED';
            }
        },
        logout: async() => {
            localStorage.removeItem( TOKEN_KEY);
            await client.post('/auth/logout', {});
        },
        
        isLogged: async () => {
            try {
                ( await client.secure.get('/central-api/auth/me') ).data;
                return true;
            } catch ( error ) {
                return false;
            }
        }
    },
    products: {
        getDetails: async( productId ) => {
            let result = (await client.get(`/cs-api/products/item/${productId}`)).data;
            return result;
        },
        getByCategoryId: async( categoryId ) => {
            let result = (await client.get(`/cs-api/products/categories/${categoryId}`)).data;
            return result;
        }
    },
    categories: {
        list: async () => {
            let result = (await client.get(`/cs-api/products/categories`)).data;
            return result;
        }
    },
}

export default api;
