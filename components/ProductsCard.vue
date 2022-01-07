<template>
  <nuxt-link :to="url" class="products__card__content">
    <img :src="require(`../static/img/${image}`)" :alt="image">
    <div class="products__card__title-content">
      <h3>{{title}}</h3>
      <h4>{{subtitle}}</h4>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      requied: false,
    },
    url: {
      type: String,
      required: false,
    },
    subtitle: {
      type: String,
      required: false,
    }
  }
}
</script>

<style lang="scss">
  .products {
    &__card {
      &__content {
        display: grid;
        justify-content: center;
        gap: var(--f-gutter);
        text-align: center;
        text-decoration: none;
        p, h3 {
          margin-bottom: 0;
        }
      }
      &__title-content {
        display: grid;
        gap: 4px;
         h4 {
           color: var(--color-neutral-04);
           margin-bottom: 0;
         }
      }
    }
  }
</style>