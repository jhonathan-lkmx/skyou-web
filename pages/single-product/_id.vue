<template>
    <div class="products">
        <div class="products__header">
            <div class="products__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb"> Products 
                        <svg class="router__breadCrumb__chevron" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a class="router__breadCrumb__textProduct" v-if="category"> {{category.name}}</a>
                </div>
            </div>
        </div>
        <div class="products__categories">
            <div class="products__categories__items">
                <div class="products__categories__items__gender" v-for="category in listProductCategory" :key="category.id">
                    <h1>{{category.name}}</h1>
                    <card-products class="card" :listProductCategory="category.products"/>
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
        this.categoryId = this.$route.params.id;
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

    &__header{
        width: 100%;
        height: 75px;
        display: flex;
        justify-content: center;
        margin-top: 20px;

        &__title{
            width: 60%;
            @include respond-to('<=m'){
                width: 70%;

                @include respond-to('<=s'){
                    width: 80%;
                }
            }
            

            .router{
                margin-bottom: 20px;

                &__breadCrumb{
                    font-size: 30px;
                    @include respond-to('<=m'){
                        font-size: 25px;

                        @include respond-to('<=s'){
                            font-size: 20px;
                        }
                    }
                    text-decoration: none;
                    color: var(--flui-breadcrumb-link-color);
                    &:hover {
                        color: var(--color-primary-fashion-fuchsia);
                    }

                    &__textProduct{
                        font-family: Comfortaa;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 30px;
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
                h1 {
                    text-align: left;
                    color: #EE008F;
                    margin-top: 4rem;
                    margin-bottom: 1rem;
                }
            }
            .card{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-auto-rows: 320px;
                gap: 10px;
                @include respond-to("<=m") {
                    grid-template-columns: 1fr 1fr;

                    @include respond-to("<=s"){
                        grid-template-columns: 1fr;
                    }
                }

            }
        }
    }


}
</style>