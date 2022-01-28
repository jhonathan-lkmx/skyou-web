<template>
    <div class="products">
        <div class="products__header">
            <div class="products__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb"> products 
                        <svg class="router__breadCrumb__chevron" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a class="router__breadCrumb__textProduct"> {{listProductCategory.name}}</a>
                </div>
            </div>
        </div>
        <div class="products__categorys">
            <div class="products__categorys__items">
                <card-products class="card" :listProductCategory="listProductCategory"/>
            </div>
        </div>
    </div>
</template>
<script>
import cardProducts from '../../components/ProductCategoryCard.vue'

export default{
    name:'id',
    components:{
        cardProducts
    },
    data(){
        return{
            categoryId: this.$route.params.id,
            listProductCategory: ''
        }
    },
    mounted(){
        this.getCategoryId()
    },
    methods:{
        async getCategoryId(){
            var id = this.categoryId
            var products = await this.$csapi().products.getByCategoryId(id);
            this.listProductCategory = products
        }
    },
    asyncData({ $csapi }) {
        $csapi('asyncData')
    }
}
</script>
<style lang="scss" scoped>
@import "@lkmx/flare/src/functions/_respond-to.scss";

.products{ 
    height: auto;
    display: inline;

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

    &__categorys{
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