<template>
    <div class="products">
       <div class="products__header">
            <div class="products__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb"> Products 
                        <svg class="flui-breadcrumb__link__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a :href="`/single-product/item?id=${listDetails.productCategoryId}`" class="router__breadCrumb" v-if="listDetails"> {{listDetails.productCategory}}
                        <svg class="flui-breadcrumb__link__chevron" width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a class="router__breadCrumb__textProduct" v-if="listDetails"> {{listDetails.productName}} </a>
                </div>
            </div>
        </div>
        <div class="products__controlImg" v-if="modelAvailable">
            <div class="products__controlImg__img">

            <canvas id="product3DPreview" width="720px" height="720px"></canvas>

            </div>
        </div>
        <div class="products__details">
            <div class="products__details__container1">
                <h1 class="titleName"> {{listDetails.productName}} </h1>
                <h3 class="titleCode"> {{listDetails.productCode}} </h3>
                <div class="detailsProduc">
                    <label class="detailsProduc__details"> Details </label>
                    <p class="detailsProduc__textDetails" v-html="listDetails.productDescription"></p>
                    <nuxt-link to="/about-us" class="detailsProduc__KnowMore">Want to know more about our fabrics?</nuxt-link>
                </div> 
            </div>
            <div class="products__details__container2" >
                <div class="cost">
                    <div class="cost__msrp">
                        <h1 class="cost__msrp__text">MSRP </h1>
                        <h1 class="cost__msrp__textCost" v-if="listDetails.priceType">{{listDetails.priceType.msrpPrice | currency}}</h1>
                    </div>
                </div>
                <div class="listCost" v-show="statusMessage" v-if="listDetails.priceTiers">
                    <div class="listCost__units">
                        <p class="textUnits">Units</p>
                        <p v-for="(cost, index) in listDetails.priceTiers.slice(0, priceLimits)" :key="index" class="listCost__units__unit">
                            {{cost.unit}} 
                            <span v-if="index==0">/ Shopify MOD <vue-custom-tooltip class="tooltip" :multiline="true" label="All orders processed through the Shopify app are considered MOD (manufacture on demand), and will be billed at the MOD price.  To receive bulk pricing please reach out to us at sales@skyou.com.  In order to qualify for bulk pricing you must order the same product and the same design e.g. 10 t-shirts with the same bunny design (you can order any variation of sizes).">?</vue-custom-tooltip></span>
                        </p>
                    </div>
                    <div class="listCost__mrsp">
                        <p class="textMrsp">Cost</p>
                        <p v-for="(cost, index) in listDetails.priceTiers.slice(0, priceLimits)" :key="index" class="listCost__mrsp__price"> {{cost.price | currency}} </p>
                    </div>
                </div>
                <div class="message" v-if="isLogged">
                    <p class="message__showMessage" @click.prevent="statusMessages" v-show="!statusMessage">Show bulk prices</p>
                    <p class="message__hideMessage" @click.prevent="statusMessages" v-show="statusMessage">Hide bulk prices</p>
                </div>
                <div class="login-message" v-else>
                    <a @click="openLogin">Log in for bulk pricing.</a>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/service/api';

export default{
    name:'id',
    data(){
        return{
            detailsId: null,
            listDetails: '',
            statusMessage:true,
            isLogged: false,
            modelAvailable: true
        }
    },
    computed: {
        priceLimits() {
            return this.isLogged ? 100 : 1;
        }
    },
    async mounted() {
        this.detailsId = this.$route.query.id;
        this.getCategoryId()
        this.checkSession();
        this.$root.$on('session-updated', this.checkSession);
        this.$root.$on('session-updated-logout', this.checkSessionLogout);
    },
    methods:{
        async getCategoryId(){
            let id = this.detailsId
            let products = await api.products.getDetails(id);
            this.listDetails = products;
            this.loadPreview( this.listDetails.productCode );
        },
        loadPreview( code ) {
            skyou_render_product_thumb(
                    document.getElementById('product3DPreview'),
                    this.$config.product3dTool,
                    code );
        },
        statusMessages(){
            this.statusMessage = !this.statusMessage
        },
        async checkSession() {
            this.isLogged = await api.auth.isLogged();
        },
        async checkSessionLogout() {
            this.isLogged = false;
            await api.auth.isLogged();
        },
        openLogin() {
            this.$root.$emit('session-login-open');
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@lkmx/flare/src/functions/_respond-to.scss";

.tooltip {
    display: inline-block;
    border-radius: 1rem;
    line-height: 1rem;
    background-color: black;
    color: white;
    padding: 2px 6px;
}
#product3DPreview {
    position: relative; 
    height: 100%;
    

    cursor: move; /* fallback */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
}
#product3DPreview:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
}

.products{ 
    height: auto;
    display: inline;
    background-color: white;

    &__header{
        width: 100%;
        min-height: 75px;
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
            

            .router{
                margin-bottom: 20px;
                line-height: 2rem;

                &__breadCrumb{
                    font-size: 1rem;
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
                        font-family: var(--f-default-text-font);
                        font-style: normal;
                        font-weight: 400;
                        font-size: 1rem;
                        text-decoration: none;
                        color: var(--color-neutral-01);
                        @include respond-to('<=m'){
                            font-family: Comfortaa;
                            font-style: normal;
                            font-size: 25px;
                            font-size: 300;

                            @include respond-to('<=s'){
                                font-family: Comfortaa;
                                font-style: normal;
                                font-weight: bold;
                                font-size: 20px;
                            }
                        }
                    }
                }

            }

        }
    }

    &__controlImg{
        width: 100%;
        margin-top: 1rem;
        text-align: center;

        &__img{
            display: inline-block;
            text-align: center;
            overflow: hidden;
            background-color:  var(--color-neutral-09);

            max-height: 100%;
            @include respond-to('<=m'){

                @include respond-to('<=s'){
                    width: 100%;
                    max-width: 420px;
                }
            }
            
            
            #product3DPreview {
                max-width: 640px;
                display: inline-block;

                @include respond-to('<=s'){
                    width: 100%;
                }
            }
        }
    }

    &__details{
        display: grid;
        grid-template-columns: 20% 40% 20% 20%;
        margin-bottom: 16px;
        margin-top: 16px;

        @include respond-to('<=m'){
            display: grid;
            grid-template-columns: 10% auto 10%;

            @include respond-to('<=s'){
                display: grid;
                grid-template-columns: 10% auto 10%;        
            }
        }
        grid-template-rows: auto auto auto auto;
        &__container1{
            height: auto;
            grid-column: 2 / 3;
            margin-bottom: 16px;
            @include respond-to('<=m'){
                grid-row: 1 / 2;

                @include respond-to('<=s'){
                    grid-row: 1 / 2;      
                }
            }
            .titleName {
                font-size: 34px;
                margin-bottom: 8px;
            }
            .titleCode {
                font-weight: 400;
                color: var(--color-primary-fashion-fuchsia);
                font-size: 16px;
                margin-bottom: 2rem;
            }

            .detailsProduc {
                width: 100%;
                &__details{
                    font-family: var(--f-default-headers-font);
                    font-size: 16px;
                    font-weight: 700;
                }
                &__textDetails{
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 29px;
                }
                &__KnowMore{
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 18px;
                    text-decoration: none;
                    color: var(--color-primary-fashion-fuchsia);
                }
            }
        }
        &__container2{
            grid-column: 3 / 4;
            height: 100%;
            text-align: left;
            min-width: 230px;
            
            @include respond-to('<=m'){
                grid-column: 2 / 3;
                grid-row: 2 / 3;

                @include respond-to('<=s'){
                    grid-column: 2 / 3;
                    grid-row: 2 / 3;      
                }
            }

            .cost{
                height: 70px;
                box-shadow: inset 0px -3px 0px #E3E6E8;
                width: 100%;
                
                background-color: var(--color-neutral-09);

                &__msrp{
                    width: 100%;
                    height: 40px;
                    text-align: right;
                    padding-right: 15px;
                    margin-top: 5px;

                    h1{
                        display: inline;
                    }

                    &__text, &__textCost{
                        font-size: 34px;
                    }

                    &__text{
                        color: var(--color-neutral-03);
                    }
                    &__textCost{
                        color: var(--color-primary-fashion-fuchsia);
                    }
                }

                &__yourCost{
                    text-align: right;
                    margin-right: 15px;
                    width: 100%;
                    height: 40px;

                    h1{
                        display: inline;
                    }

                    &__text, &__textCost{
                        font-size: 16px;
                        text-transform: uppercase;
                    }

                    &__text{
                        color: var(--color-neutral-04);
                    }
                    &__textCost{
                        color: var(--color-neutral-03);
                    }
                }

            }

            .listCost{
                display: grid;
                grid-template-columns: 60% 40%;
                background-color: var(--color-neutral-09);
                padding-top: 0.5rem;

                &__units{
                    text-align: left;
                    margin-left: 20px;
                    .textUnits{
                        font-size: 16px;
                    }

                    &__unit{
                        font-size: 16px;
                        font-weight: bold;
                        align-self: stretch;
                        margin-bottom: 25px;
                        color: var(--color-neutral-01);
                    }
                }

                &__mrsp{
                    text-align: right;
                    margin-right: 20px;
                    .textMrsp{
                        font-size: 16px;
                    }

                    &__price{
                        font-size: 24px;
                        margin-bottom: 25px;
                        color: var(--color-primary-fashion-fuchsia);

                    }
                }
            }

            .login-message,
            .message {
                padding-top: 10px;
                text-align: center;
                background-color: var(--color-neutral-09);

                &__hideMessage, &__showMessage{
                    color: var(--color-primary-fashion-fuchsia);
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 18px;
                    cursor: pointer;
                    padding-bottom: 1.5rem;
                }
                &__showMessage{
                    padding-top: 1rem;
                }
            }


            .login-message {
                padding-top: 1rem;
                padding-bottom: 27px;
            }

            .login-message a {
                cursor: pointer;
                padding-top: 1rem;
                padding-bottom: 1rem;
                color: var(--color-primary-fashion-fuchsia);
                font-weight: 400;
            }
            
        }
    }

}
</style>