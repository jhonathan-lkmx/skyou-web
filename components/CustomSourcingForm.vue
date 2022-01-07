<template>
  <iframe src="https://forms.monday.com/forms/embed/f5b88f3115f3af9ec6f0c45f4eb4a302?r=use1" 
  width="650" height="3600" style="border: 0;">
  </iframe>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
iframe {
  @include respond-to("<=m") {
    width: 100vw;
      @include respond-to("<=s") {
        height: 3800px;
      }
  }
}
</style>