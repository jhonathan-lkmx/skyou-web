import client from '@/service/client';

const api = {
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
