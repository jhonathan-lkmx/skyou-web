<template>
  <simple-layout>
    <flui-header
      mode="full"
      logo="skyou-black--horizontal.svg"
      :mainNavigation="[
        { title: 'Home', to: '/' },
        { title: 'Category', to: '/category' },
        { title: 'About Us', to: '/about-us' },
        { title: 'Our Technology', to: '' },
        { title: 'Our Services', to: '' },
        { title: 'Custom Sourcing', to: '/custom-sourcing' }
      ]"
      :actions="[
        { title: 'Login', to: '/ssoLogin' },
        { title: '', to: '/' }
      ]"
    />
  </simple-layout>
</template>

<script>
import FluiHeader from '../components/FluiHeader.vue';
export default {
  components: { FluiHeader},
  data(){
    return{
      pagLogin: 'SsoLogin'
    }
  }
};
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";

#__nuxt {
  .simple-footer {
    background-color: var(--color-neutral-01);
    padding: var(--f-gutter-xl) 0;
    border-top: var(--f-gutter) solid;
    border-image-slice: 1;
    border-image-source: var(--color-gradient-90-deg);
    overflow: hidden;
    @include respond-to("<=m") {
      padding: 0;
    }
    &__content {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      /* grid-auto-flow: column;  */
      @include respond-to("<=m") {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, auto);
        /* grid-auto-flow: row; */
      }
      &__info-skyou {
        display: grid;
        gap: var(--f-gutter-xl);
        padding: var(--f-gutter);
        @include respond-to("<=m") {
          padding: var(--f-gutter-l) 0;
        }
      }
      &__skyou {
        display: grid;
        gap: var(--f-gutter);
        &--logo {
          width: 150px;
          height: 44px;
        }
        @include respond-to("<=m") {
          justify-content: center;
        }
      }
      &__social-media {
        display: grid;
        grid-auto-flow: column;
        justify-content: start;
        gap: 10px;
        @include respond-to("<=m") {
          justify-content: center;
        }
      }
      &__contact {
        display: grid;
        gap: var(--f-gutter);
        &__mail,
        &__phone,
        &__location {
          display: grid;
          grid-auto-flow: column;
          justify-content: start;
          gap: 10px;
          a {
            margin-bottom: 0;
            /* line-height: var(--f-default-link-line-height); */
            color: var(--color-neutral-10);
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
            &:active {
              color: var(--color-neutral-03);
            }
          }
          img {
            height: 24px;
          }
          p {
            margin-bottom: 0;
            line-height: 18px;
          }
          @include respond-to("<=m") {
            grid-auto-flow: row;
            justify-content: center;
            gap: 10px;
            img {
              display: block;
              margin: auto;
            }
            p {
              text-align: center;
            }
          }
        }
        &__location {
          a {
            @include respond-to(">=l") {
              width: 90%;
            }            
            @include respond-to("<=m") {
              text-align: center;
            }                        
          }
        }
        p {
          color: var(--color-neutral-10);
        }
      }
      &__products,
      &__about-us,
      &__our-technology,
      &__our-services,
      &__custom-sourcing {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: var(--f-gutter);
        padding: var(--f-gutter);
        @include respond-to("<=m") {
          padding: var(--f-gutter-l) 0;
          justify-content: center;
          text-align: center;
        }
        h4 {
          color: var(--color-neutral-10);
          margin: 0;
        }
        &__links-container {
          display: grid;
          grid-auto-flow: row;
          gap: 10px;
          height: max-content;
          a {
            text-decoration: none;
            color: var(--color-neutral-06);

            &:hover {
              text-decoration: underline;
            }
            &:active {
              color: var(--color-neutral-03);
            }
          }
        }
      }
    }
    &__legal {
      display: grid;
      grid-template-columns: 1200px;
      padding: var(--f-gutter);
      background-color: var(--color-neutral-02);
      justify-content: center;
      @include respond-to("<=l") {
        grid-template-columns: 1fr;
        @include respond-to("<=m") {
          padding: var(--f-gutter-l) var(--f-gutter);
        }
      }
      p {
        margin: 0;
        color: var(--color-neutral-10);
      }
      &__skyou-legend {
        padding: var(--f-gutter);
        @include respond-to("<=m") {
          padding: 0;
          text-align: center;
        }
      }
    }
    .--flare {
      .content {
        @include respond-to("<=m") {
          width: 100%;
        }
        .box {
          padding: 0;
          @include respond-to("<=m") {
            padding: 0 var(--f-gutter);
          }
        }
      }
    }
  }
}
</style>
