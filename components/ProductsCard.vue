<template>
  <div class="list">
    <div class="list__product" v-for="product in listProducts" :key="product.id">
      <div class="list__product__img">
        <img :src="product.image" class="img" :alt="product.name">
      </div>
      <div class="list__product__item">
        <nuxt-link :to="`/single-product/${product.id}`" class="title"> {{product.name}} </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listProducts: ''
  }
}
</script>

<style lang="scss" scope>

.list{
  &__product{
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