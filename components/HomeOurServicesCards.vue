<template>
  <div class="home__our-services__cards__grid-content">
    <slot name="grid-image"></slot>
    <slot name="grid-title"></slot>
    <slot name="grid-text"></slot>
    <slot name="grid-btn"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
  .home {
    &__our-services {
      &__cards {
        &__grid-content {
            display: grid;
            gap: var(--f-gutter);
            border-radius: 4px;
            text-align: center;
            padding: var(--f-gutter);
            background-color: var(--color-neutral-10);
            h3 {
              color: var(--color-primary-fashion-fuchsia);
            }
            p, h3 {
              margin-bottom: 0;
            }
            img {
              width: 100%;
              height: 188px;
              @include respond-to("<=m") {
                height: auto;
              }
            }
            strong {
              font-weight: bolder;
            }
            p:nth-of-type(2) {
              height: 87px;
            }
            &:hover {
              background: var(--color-neutral-09);
            }
        }
      }
    }
  }

</style>