<template>
    <div class="products">
       <div class="products__header">
            <div class="products__header__title">
                <div class="router">
                    <a href="/products" class="router__breadCrumb"> Products 
                        <svg class="flui-breadcrumb__link__chevron" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a :href="`/single-product/${listDetails.productCategoryId}`" class="router__breadCrumb"> {{listDetails.productCategory}}
                        <svg class="flui-breadcrumb__link__chevron" width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z" fill="#5E7187"/>
                        </svg>
                    </a>
                    <a class="router__breadCrumb__textProduct"> {{listDetails.productName}} </a>
                </div>
            </div>
        </div>
        <div class="products__controlImg">
            <div class="products__controlImg__img">

            <canvas id="product3DPreview" width="720px" height="720px"></canvas>

            </div>
        </div>
        <div class="products__details">
            <div class="products__details__container1">
                <h1 class="titleName"> {{listDetails.productName}} </h1>
                <div class="detailsProduc">
                    <label class="detailsProduc__details"> Details </label>
                    <p class="detailsProduc__textDetails" v-html="listDetails.productDescription"></p>
                    <nuxt-link to="/about-us" class="detailsProduc__KnowMore">Want to know more about our fabrics?</nuxt-link>
                </div> 
            </div>
            <div class="products__details__container2" >
                <div class="cost">
                    <div class="cost__msrp">
                        <h1 class="cost__msrp__text">MSRP  </h1>
                        <h1 class="cost__msrp__textCost" v-if="listDetails.priceType">{{listDetails.priceType.msrpPrice | currency}}</h1>
                    </div>
                    <div class="cost__yourCost">
                        <h1 class="cost__yourCost__text">your cost  </h1>
                        <h1 class="cost__yourCost__textCost" v-if="listDetails.priceType">{{listDetails.priceType.marketPrice | currency }}</h1> 
                    </div>
                </div>
                <div class="listCost" v-show="statusMessage && false">
                    <div class="listCost__units">
                        <p class="textUnits">Units</p>
                        <p v-for="(cost, index) in listDetails.priceTiers" :key="index" class="listCost__units__unit"> {{cost.unit}} </p>
                    </div>
                    <div class="listCost__mrsp">
                        <p class="textMrsp">MRSP</p>
                        <p v-for="(cost, index) in listDetails.priceTiers" :key="index" class="listCost__mrsp__price"> {{cost.price | currency}} </p>
                    </div>
                </div>
                <div class="message" v-show="false">
                    <p class="message__showMessage" @click.prevent="statusMessages" v-show="!statusMessage">Show bulk prices</p>
                    <p class="message__hideMessage" @click.prevent="statusMessages" v-show="statusMessage">Hide bulk prices</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    name:'id',
    data(){
        return{
            detailsId: this.$route.params.id,
            listDetails: '',
            statusMessage:true
        }
    },
    mounted(){
        this.getCategoryId()
    },
    methods:{
        async getCategoryId(){
            let id = this.detailsId
            let products = await this.$csapi().products.getDetails(id);
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
        }
    },
    asyncData({ $csapi }) {
        $csapi('asyncData')
    }
}
</script>
<style lang="scss" scoped>
@import "@lkmx/flare/src/functions/_respond-to.scss";

#product3DPreview {
    position: relative; 
    //width: 100%; 
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
                line-height: 2rem;

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
        height: 753px;
        @include respond-to('<=m'){
            height: 620px;

            @include respond-to('<=s'){
                height: 500px;
            }
        }
        display: flex;
        justify-content: center;
        flex-wrap: wrap; 
        align-content: center;

        &__img{
            position: relative;
            text-align: center;
            overflow: hidden;
            width: 60%;
            @include respond-to('<=m'){
                width: 70%;
                height: 600px;

                @include respond-to('<=s'){
                    width: 80%;
                    height: 481px;
                }
            }
            height: 721px;
            background-color: var(--color-neutral-04);
        }
    }

    &__details{
        display: grid;
        grid-template-columns: 20% 40% 20% 20%;
        margin-bottom: 16px;

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
            .titleName{
                font-size: 34px;
            }

            .detailsProduc{
                width: 100%;
                &__details{
                    font-size: 16px;
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
            background-color: var(--color-neutral-08);
            @include respond-to('<=m'){
                grid-column: 2 / 3;
                grid-row: 2 / 3;

                @include respond-to('<=s'){
                    grid-column: 2 / 3;
                    grid-row: 2 / 3;      
                }
            }

            .cost{
                height: 99px;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                box-shadow: inset 0px -3px 0px #E3E6E8;
                width: 100%;
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
                grid-template-columns: 50% 50%;

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

            .message{
                height: 35px;
                margin-top: 10px;
                display: flex;
                justify-content: center;
                flex-wrap: wrap; 
                align-content: center;
                &__hideMessage, &__showMessage{
                    color: var(--color-primary-fashion-fuchsia);
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 16px;
                    line-height: 18px;
                    cursor: pointer;
                }
            }
            
        }
    }

}
</style>