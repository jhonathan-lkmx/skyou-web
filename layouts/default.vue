<template>
  <simple-layout>
    <flui-header
      mode="full"
      logo="skyou-black--horizontal.svg"
      :mainNavigation="[
        { title: 'Home', to: '/' },
        { title: 'Products', to: '/products' },
        { title: 'About Us', to: '/about-us' },
        { title: 'Our Technology', to: '' },
        { title: 'Our Services', to: '' },
        { title: 'Custom Sourcing', to: '/custom-sourcing' }
      ]"
      :actions="[
        { title: '', to: '/' },
        { title: '', to: '/' }
      ]"
    />
    <Nuxt />
    <template #footer>
      <simple-footer>
        <section class="simple-footer__content">
          <div class="simple-footer__content__info-skyou">
            <div class="simple-footer__content__skyou">
              <img
                src="../assets/img/skyou-white--horizontal.svg"
                alt="skyou logo"
                class="simple-footer__content__skyou--logo"
              />
            </div>
            <div class="simple-footer__content__contact">
              <div class="simple-footer__content__contact__mail">
                <img src="../assets/img/icon-mail.svg" alt="mail" />
                <a href="mailto:sales@skyou.com">sales@skyou.com</a>
              </div>
              <div class="simple-footer__content__contact__phone">
                <img src="../assets/img/icon-phone.svg" alt="telephone" />
                <a href="tel:+1 6197451300">+1 619-745-1300</a>
              </div>
              <div class="simple-footer__content__contact__location">
                <img
                  src="../assets/img/icon-location-address.svg"
                  alt="location"
                />
                <a href="https://goo.gl/maps/mketr9xo5rWiPiNZ7" target="_blank">
                  2364 Paseo de las Americas, Unit 104-1541, San Diego, CA 92154, USA
                </a>
              </div>
            </div>
          </div>
          <div class="simple-footer__content__products">
            <h4>Products</h4>
            <div class="simple-footer__content__products__links-container">
              <nuxt-link to="/category">Apparel</nuxt-link>
              <nuxt-link to="/category">Bags</nuxt-link>
              <nuxt-link to="/category">Footwear</nuxt-link>
            </div>
          </div>
          <div class="simple-footer__content__about-us">
            <h4>About Us</h4>
            <div class="simple-footer__content__about-us__links-container">
              <nuxt-link to="/about-us">Our Story</nuxt-link>
              <nuxt-link to="/about-us#contact-us">Contact Us</nuxt-link>
            </div>
          </div>
          <div class="simple-footer__content__our-technology">
            <h4>Our Technology</h4>
            <div
              class="simple-footer__content__our-technology__links-container"
            >
              <nuxt-link to="/3d-design-tool">3D Design Tool</nuxt-link>
              <nuxt-link to="/inkjet-printing">Inkjet Printing</nuxt-link>
              <nuxt-link to="/cut-sew">Cut/Sew</nuxt-link>
            </div>
          </div>
          <div class="simple-footer__content__our-services">
            <h4>Our Services</h4>
            <div class="simple-footer__content__our-services__links-container">
              <nuxt-link to="/shopify-app">Shopify App</nuxt-link>
              <nuxt-link to="/full-package-for-brands">Full Package for Brands</nuxt-link>
            </div>
          </div>
        </section>
      </simple-footer>
      <section class="simple-footer__legal">
        <div class="simple-footer__legal__skyou-legend">
          <p>© SKYOU 2021. All rights reserved.</p>
        </div>
      </section>
    </template>
  </simple-layout>
</template>

<script>
export default {
  // methods: {
  //   checkForEmptyAnchors() {
  //     const getEmptyAnchors = document.querySelectorAll('[aria-hidden="true"]');
  //     getEmptyAnchors.forEach(emp => {
  //       emp.remove()
  //     })
  //   }
  // },
  // mounted() {
  //   this.checkForEmptyAnchors();
  // },
  // updated() {
  //   this.checkForEmptyAnchors();
  // },
  // watch: {
  //     $route() {
  //       setTimeout(() => {
  //         this.checkForEmptyAnchors();
  //       }, 500)
  //     },
  //   },
};
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
:root {
}

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
      grid-template-columns: repeat(5, 1fr);
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
      &__our-services {
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
