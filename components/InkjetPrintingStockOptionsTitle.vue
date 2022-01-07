<template>
  <div id="inkjet-printing__stock__options__content">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  #inkjet-printing {
    &__stock {
      &__options {
        &__content {
          display: grid;
          gap: 4px;
          grid-auto-flow: row;

          h4, p {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>