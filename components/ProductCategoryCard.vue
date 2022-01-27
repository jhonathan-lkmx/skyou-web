<template>
  <div class="list">
    <div class="list__product" v-for="product in listProductCategory.products" :key="product.id">
      <div class="list__product__img">
        <img :src="product.image" class="img" :alt="product.name">
      </div>
      <div class="list__product__item">
        <nuxt-link :to="`/details/${product.id}`" class="title"> {{product.name}} </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listProductCategory: ''
  }
}
</script>

<style lang="scss" scope>

.list{
  &__product{
    margin-bottom: 20px;
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
          font-family: Comfortaa;
          font-style: normal;
          font-weight: bold;
          font-size: 24px;
          line-height: 130%;
          text-decoration: none;
          color: var(--color-neutral-01);
          margin-top: 10px;
        }
    }
    }
  
}

</style>