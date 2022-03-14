<template>
    <div class="container">
        <div class="container__header">
            <div class="container__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb__textProduct"> Products </a>
                </div>
            </div>
        </div>
        <div class="container__products">
            <div class="container__products__group" v-for="group in listProducts" :key="group.id">
                <h1>{{group.name}}</h1>
                <card-products class="container__products__items" :listProducts="group.categories"/>
            </div>
        </div>
    </div>
</template>
<script>
import cardProducts from './ProductsCard.vue'

export default{
    name:'ListProducts',
    components:{
        cardProducts
    },
    data(){
        return{
            listProducts:'',
            categoryMap: null
        }
    },
    mounted(){
        this.loadCategories();
    },
    methods:{
        async loadCategories() {
            var categories = await this.$csapi().categories.list();

            var categoryMap = {};
            categories.forEach(cat => {
                let key = cat.group ? cat.group.id: 'Others';

                if(!categoryMap[key]) {
                    categoryMap[key] = {
                        id: cat.group ? cat.group.id : null,
                        name: cat.group ? cat.group.name: 'Others',
                        order: cat.group ? cat.displayOrder: null,
                        categories: []
                    };
                }

                categoryMap[key].categories.push(cat);
            });

            this.listProducts = categoryMap;
        }
    },
    asyncData({ $csapi }) {
        $csapi('asyncData')
    }
}
</script>
<style lang="scss" scoped>
@import "@lkmx/flare/src/functions/_respond-to.scss";

.container{
    width: 100%;
    display: flex;
    flex-direction: column;

    &__header{
        margin-top: 20px;
        width: 100%;
        margin-bottom: -15px;
        @include respond-to('<=m'){
            margin-left: 8%;
            width: 80%;

            @include respond-to('<=s'){
                margin-left: 25px;
                width: 80%;
            }
        }
        height: 75px;
        display: flex;
        justify-content: center;

        &__title{
            width: 100%;            

            .router{

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

    &__products { 

        @include respond-to('<=m'){
            width: 80%;
            margin-left: 8%;

            @include respond-to('<=s'){
                margin-left: 25px;
                width: 90%;
            }
        }


        &__group {
            h1 {
                margin-top: 4rem;
                margin-bottom: 1rem;
                color: #EE008F;
            }
        }

        &__items{
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

</style>