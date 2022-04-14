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

.list{
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
          height: unset;
          object-fit: cover;
          
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
        }
    }
    }
  
}

</style>