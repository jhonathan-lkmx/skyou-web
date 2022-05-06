<template>
    <div class="products">
        <div class="products__header">
            <div class="products__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb"> Products 
                        <svg class="router__breadCrumb__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a class="router__breadCrumb__textProduct" v-if="category"> {{category.name}}</a>
                </div>
                <h1 v-if="category">{{category.name}}</h1>
            </div>
        </div>
        <div class="products__categories">
            <div class="products__categories__items" v-if="category">
                <div class="products__categories__items__gender" v-for="category in listProductCategory" :key="category.id">
                    <h2>{{category.name}}</h2>
                    <card-products class="card" :listProductCategory="category.products"/>
                </div>
                <div class="products__categories__items__empty" v-if="category.products.length==0">
                    <img src="@/assets/img/empty-state.png">
                    <h3>Sorry, there are no products for this category yet. </h3>
                    <p>However feel free to check our other products</p>
                    <router-link class="art-action" :to="`/products`" custom>
                        <button class="with-icon" @click="navigate" @keypress.enter="navigate" role="link">Go to Products</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cardProducts from '../../components/ProductCategoryCard.vue'
import api from '@/service/api';

export default{
    name:'id',
    components:{
        cardProducts
    },
    data(){
        return{
            categoryId: null,
            category: null,
            listProductCategory: ''
        }
    },
    mounted() {
        this.categoryId = this.$route.query.id;
        this.loadCategory();
    },
    methods:{
        async loadCategory(){
            var id = this.categoryId
            var category = await api.products.getByCategoryId(id);
            this.category = category;

            var productMap = {};
            category.products.forEach(prod => {
                let key = prod.genderId ? prod.genderId: 'Others';

                if(!productMap[key]) {
                    productMap[key] = {
                        id: prod.genderId,
                        name: prod.genderName ? prod.genderName: 'Other',
                        products: []
                    };
                }

                productMap[key].products.push(prod);
            });

            this.listProductCategory = productMap;
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@lkmx/flare/src/functions/_respond-to.scss";

.products{ 
    height: auto;
    display: inline;
    padding-bottom: 120px;
    background-color: white;

    &__header{
        width: 100%;
        height: 136px;
        display: flex;
        justify-content: center;
        padding-top: 20px;
        background-color: var(--color-neutral-09);

        &__title{
            width: 60%;
            @include respond-to('<=m'){
                width: 70%;

                @include respond-to('<=s'){
                    width: 80%;
                }
            }
            

            .router {
                margin-bottom: 20px;

                &__breadCrumb{
                    font-size: 1rem;
                    @include respond-to('<=m'){
                        font-size: 25px;

                        @include respond-to('<=s'){
                            font-size: 20px;
                        }
                    }
                    text-decoration: none;
                    color: var(--color-neutral-04);
                    
                    &:hover {
                        color: var(--color-primary-fashion-fuchsia);
                    }

                    &__textProduct{
                        font-family: var(--f-default-text-font);
                        font-style: normal;
                        font-weight: 400;
                        font-size: 1rem;
                        text-decoration: none;
                        color: var(--color-neutral-01);
                        @include respond-to('<=m'){
                            font-size: 25px;
                            font-size: 300;

                            @include respond-to('<=s'){
                                font-size: 20px;
                                font-weight: 200;
                            }
                        }
                    }
                }

            }

            h1 {
                margin-top: 1.5rem;
                margin-bottom: 20px;
                font-size: 44px;
                font-weight: 700;
            }

        }
    }

    &__categories{
        width: 100%;
        display: flex;
        justify-content: center;
        text-align: center;

        &__items{
            width: 60%;
            @include respond-to('<=m'){
                width: 70%;
                @include respond-to('<=s'){
                    width: 80%;
                }
            }
            &__gender {
                h2 {
                    font-size: 34px;
                    font-weight: 700;
                    text-align: left;
                    color: var(--color-primary-fashion-fuchsia);
                    margin-top: 4rem;
                    margin-bottom: 1rem;
                    @include respond-to('<=m'){
                        margin-top: 2rem;
                        @include respond-to('<=s'){
                            margin-top: 1rem;
                        }
                    }
                    
                }
            }

            &__empty {
                text-align: center;
                padding: 2.5rem;
                h3 {
                    margin-top: 1rem;
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 31.2px;
                    color: #121516;
                    font-family: Comfortaa;
                }
                p {
                    color: #84949A;
                    font-size: 16px;
                    line-height: 18px;
                }
                img {
                    display: inline-block;
                }
                button {
                    background-color: var(--color-primary-fashion-fuchsia);
                    color: white;
                    border-radius: 4px;
                    cursor:pointer;
                }
            }
        }
    }


}
</style>