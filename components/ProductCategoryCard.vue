<template>
  <div class="list">
    <div class="list__product" v-for="product in listProductCategory" :key="product.id">
      <nuxt-link :to="`/details/item?id=${product.id}`" class="list__product__link">
        <div class="list__product__img">
          <img :src="`${product.imageUrl}?${now}`" class="img" :alt="product.name" v-if="product.imageUrl">
          <img src="../assets/img/image-placeholder.png" class="img" :alt="product.name" v-else>
        </div>
        <div class="list__product__item">
          <span class="title"> {{product.name}} </span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listProductCategory: ''
  },
  data() {
    return {
      now: new Date().getTime()
    }
  },
}
</script>

<style lang="scss" scope>
@import "@lkmx/flare/src/functions/_respond-to.scss";

.list{

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 325px;
  gap: 32px;

    
  @include respond-to("<=m") {
    grid-template-columns: 1fr 1fr;
    row-gap: 16px;

    @include respond-to("<=s") {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      grid-auto-rows: 300px;
      row-gap: 0;
    }
  }


  &__product{
    margin-bottom: 20px;

    
    &__link {
      text-decoration: none;
    }

    &__img{
        width: 100%;
        height: unset;
        

        .img{
          width: 100%;
          max-width: 250px;
          height: unset;
          object-fit: cover;
          display: inline-block;
          
          &:after {
            content: "";
            display: block;
            padding-bottom: 100%;
          }
        }
    }

    &__item{
        width: 100%;
        height: 105px;
        display: flex;
        justify-content: center;
        align-content: center;

        .title{
          font-family: Comfortaa;
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          line-height: 31.2px;
          color: var(--color-neutral-01);
          margin-top: 10px;
          text-align: center;
          @include respond-to("<=s") {
            font-size: 18px;
          }
        }
    }
    }
  
}

</style>