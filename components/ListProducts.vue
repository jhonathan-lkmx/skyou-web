<template>
    <div class="products">
        <card-products class="products__items" :listProducts="listProducts"/>
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
            listProducts:''
        }
    },
    mounted(){
        this.loadCategories();
    },
    methods:{
        async loadCategories() {
            var categories = await this.$csapi().categories.list();
            this.listProducts=categories;
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
</style>