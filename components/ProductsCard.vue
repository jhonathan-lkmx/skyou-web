<template>
  <div class="list">
    <div class="list__product" v-for="product in listProducts" :key="product.id">
      <nuxt-link :to="`/single-product/item?id=${product.id}`" class="list__product__link">
        <div class="list__product__img">
          <img :src="product.image" class="img" :alt="product.name" v-if="product.image">
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
  }
}
</script>

<style lang="scss" scope>

.list{
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