<template>
  <div class="list">
    <div class="list__product" v-for="product in listProducts" :key="product.id">

      <nuxt-link :to="`/single-product/item?id=${product.id}`" class="list__product__link">
        <div class="list__product__img">
          <img :src="`${product.imageUrl}?${now}`" class="img" :alt="product.name" v-if="product.imageUrl">
          <img src="../assets/img/image-placeholder.png" class="img" :alt="product.name" v-else>
        </div>
        <div class="list__product__item">
          <span class="title"> {{product.name}}</span>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    listProducts: ''
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
  grid-auto-rows: 320px;
  gap: 32px;
  @include respond-to("<=m") {
    grid-template-columns: 1fr 1fr;

    @include respond-to("<=s"){
      grid-template-columns: 1fr;
    }
  }





  &__product{
    &__link {
      text-decoration: none;
    }

    &__img{
      width: 100%;
      height: 80%;

      .img{
        width: 100%;
        height: 100%;
      }
    }

    &__item{
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: center;
      align-content: center;

      .title{
        font-size: 20px;
      }
    }
  }
  
}

</style>