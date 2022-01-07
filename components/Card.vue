<template>
  <div class="card__content">
    <h3>{{title}}</h3>
    <p class="card__content--description">{{subtitle}}</p>
    <slot name="image"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    subtitle: {
      tytpe: String,
      required: false,
    }
  }
}
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
  .card {
    &__content {
      display: grid;
      gap: var(--f-gutter);
      h3, p {
        margin-bottom: 0;
      }
      h3 {
        color: var(--color-neutral-03);
      }
      &--description {
        height: 87px;
        @include respond-to("<=m") {
          height: auto;
        }
      }
    }
  }
</style>