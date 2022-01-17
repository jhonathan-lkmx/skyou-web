<template>
  <nav class="flui-header-nav">
    <ul class="flui-header-nav__items">
      <li
        v-for="(item, index) in navItems"
        :key="index"
        class="flui-header-nav__items__single-item"
      >
        <a
          class="flui-header-nav__items__single-item__top-anchor"
          :href="item.to"
          :class="item.sigleMenu"
        >
          {{ item.title }}
          <svg
            v-if="item.dropDownList"
            class="flui-header-nav__items__single-item__top-anchor__chevron"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="#121516"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
        <ul
          class="flui-header-nav__items__single-item__dropdown"
          v-if="item.dropDownList"
        >
          <li
            v-for="(dropdownItem, index) in item.dropDownList"
            :key="index"
            class="flui-header-nav__items__single-item__dropdown__single-item"
          >
            <nuxt-link
              class="flui-header-nav__items__single-item__dropdown__single-item__anchor"
              :to="dropdownItem.to"
              >{{ dropdownItem.title }}</nuxt-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          title: "Home",
          to: "/",
          sigleMenu: "is-single-menu",          
        },
        {
          title: "Categories",
          to: "/category",
          sigleMenu: "is-single-menu"
        },
        {
          title: "About Us",
          to: "/about-us",
        },
        {
          title: "Our Technology",
          to: "",
          dropDownList: [
            {
              title: "3D Design Tool",
              to: "/3d-design-tool",
            },
            {
              title: "Inkjet Printing",
              to: "/inkjet-printing",
            },
            {
              title: "Cut/Sew",
              to: "/cut-sew",
            },
          ],
        },
        {
          title: "Our Services",
          to: "",
          dropDownList: [
            {
              title: "Shopify App",
              to: "/shopify-app",
            },
            {
              title: "Full Package for Brands",
              to: "/full-package-for-brands",
            }
          ],
        },
        {
          title: "Custom Sourcing",
          to: "/custom-sourcing",
          sigleMenu: "is-single-menu",
        },
      ],
    };
  },
  methods: {
    setNav() {
      const topAnchorEl = document.querySelectorAll(
        ".flui-header-nav__items__single-item__top-anchor"
      );
      topAnchorEl.forEach((anchor) => {
        let dropdownIsOpen = false;

        anchor.addEventListener("click", function (e) {
          // Getting elements
          const dropdownEl = anchor.nextElementSibling;
          const parentEl = anchor.parentElement;
          const chevronEl = anchor.firstElementChild;

          // general functions
          const smoothEnter = function (el) {
            el.classList.add("dropdown-is-open");
            el.classList.add("nav-enter");
            chevronEl.classList.add("rotate");
            setTimeout(() => {
              el.classList.remove("nav-enter");
            }, 400);
          };

          const smoothLeave = function (el) {
            el.classList.add("nav-leave");
            chevronEl.classList.remove("rotate");
            setTimeout(() => {
              el.classList.remove("nav-leave");
              el.classList.remove("dropdown-is-open");
            }, 400);
          };

          // Boolean toggle
          dropdownIsOpen = !dropdownIsOpen;

          // dropdown only appears when anchor hasn't href value and dropdownIsOpen boolean is true
          if (anchor.attributes.href.value === "") {
            e.preventDefault();
            if (dropdownIsOpen) {
              smoothEnter(dropdownEl);
            } else if (!dropdownIsOpen) {
              smoothLeave(dropdownEl);
            }
          }

          // dropdown dissappears when mouse leaves
          parentEl.addEventListener("mouseleave", function (e) {
            dropdownIsOpen = false;
            smoothLeave(dropdownEl);
          });
        });
      });
    },
    async loadCategories() {
      var categories = await this.$csapi().categories.list();
      console.log('Categories loaded ', categories);
    },
    async loadTestProduct() {
      const id = 6;
      var product = await this.$csapi().products.getDetails(5);
      console.log('Product  loaded ', product);
    },
    async testEndpoints() {

      // Test login endpoint
      var token = await this.$csapi().auth.login({username: 'brandtestpartner@gmail.com', password: '111111'});
      console.log('Token ', token);


      // Test categories endpoint
      var categories = await this.$csapi().categories.list();
      console.log('Categories ', categories);


      // Test products by categories endpoint
      var products = await this.$csapi().products.getByCategoryId(7);
      console.log('Products ', products);

      // Test product endpoint
      var product = await this.$csapi().products.getDetails(28);
      console.log('Product ', product);

      // Test me endpoint
      var me = await this.$csapi().auth.getMe();
      console.log('Me ', me);

      // Test logout endpoint
      await this.$csapi().auth.logout();
      console.log('Out ok');

      // Test me endpoint
      var me2 = await this.$csapi().auth.getMe();
      console.log('This should be an error ', me2);
    }
  },
  mounted() {
    this.setNav();
    
    this.testEndpoints();
  },
  asyncData({ $csapi }) {
      $csapi('asyncData')
  }
};
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
:root {
  --flui-header-nav-background-color: var(--color-neutral-08);
  --flui-header-nav-height: 100%;
  --flui-header-nav-top-anchor-text-color: var(--color-neutral-01);
  --flui-header-nav-top-anchor-background-color: var(--color-neutral-07);
  --flui-header-nav-top-dropdown-top-position: var(--flui-header-nav-height);
  --flui-header-nav-dropdown-background-color: var(--color-neutral-10);
  --flui-header-nav-dropdown-border-radius: 4px;
  --flui-header-nav-dropdown-zindex: 9;
  --flui-header-nav-dropdown-box-shadow: 0px 8px 16px rgba(18, 21, 22, 0.12);
  --flui-header-nav-dropdown-text-color: var(--color-neutral-03);
  --flui-header-nav-transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --flui-header-nav-top-anchor-text-color-hover: var(--color-neutral-03);
}

body {
  .flui-header-nav {
    display: grid;
    background: transparent;
    height: var(--flui-header-nav-height);
    width: 100%;
    @include respond-to("<=m") {
      height: 100%;
      background-color: var(--color-neutral-10);
      width: 100%;
    }
    * {
      margin: 0;
      height: 100%;
      text-decoration: none;
    }
    &__items {
      display: inline-grid;
      grid-auto-flow: column;
      padding-left: 0;
      @include respond-to("<=m") {
        grid-auto-flow: row;
        gap: var(--f-gutter-l);
      }
      &__single-item {
        display: grid;
        align-items: center;
        justify-items: center;
        position: relative;
        @include respond-to("<=m") {
         width: 100%;
        }
        &__top-anchor {
          display: grid;
          grid-auto-flow: column;
          align-content: center;
          justify-content: center;
          gap: 4px;
          width: 100%;
          color: var(--flui-header-nav-top-anchor-text-color);
          text-align: center;
          height: auto;
          padding: 23px var(--f-gutter);
          @include respond-to('<=m') {
            padding: var(--f-gutter);
          }          
          &:hover {
            color: var(--flui-header-nav-top-anchor-text-color-hover);
          }
          align-items: center;
          @include respond-to("<=m") {
            justify-content: center;            
            &:hover {
            background-color: transparent;
            }
            &:not(.is-single-menu) {
              color: var(--color-neutral-06);
              font-weight: bolder;
              pointer-events: none;
            }
          }
          &__chevron {
            transition: var(--flui-header-nav-transition);
            @include respond-to("<=m") {
              display: none;
            }
            &.rotate {
              transform: rotate(-180deg);
            }
          }
          &:active {
            @include respond-to("<=m") {
              background-color: var(--color-neutral-09);
            }                 
          }          
        }
        &__dropdown {
          position: absolute;
          padding-left: 0;
          top: var(--flui-header-nav-top-dropdown-top-position);
          background-color: var(--flui-header-nav-dropdown-background-color);
          border-radius: var(--flui-header-nav-dropdown-border-radius);
          z-index: var(--flui-header-nav-dropdown-zindex);
          box-shadow: var(--flui-header-nav-dropdown-box-shadow);
          display: none;
          top: 56px;
          left: 0;
          @include respond-to("<=m") {
            display: grid;
            position: relative;
            top: 0;
            background-color: transparent;
            box-shadow: none;
            width: 100%;
            border-radius: 0;
          }
          * {
            margin: 0;
          }
          &.dropdown-is-open {
            display: grid;
            height: auto;
          }
          &__single-item {
            &__anchor {
              display: flex;
              flex: auto;
              white-space: nowrap;
              color: var(--flui-header-nav-dropdown-text-color);
              padding: var(--f-gutter);
              border-radius: var(--flui-header-nav-dropdown-border-radius);
              min-width: 240px;
              @include respond-to("<=m") {
               color: inherit;     
               justify-content: center;  
               color: var(--color-neutral-01);
               width: 100%;
              }
              &:hover {
                background-color: var(--color-neutral-09);
                color: var(--color-neutral-01);
                @include respond-to("<=m") {
                  background-color: unset;
                }
              }
              &:active {
                @include respond-to("<=m") {
                  background-color: var(--color-neutral-09);
                }                 
              }                
            }
          }
        }
      }
    }
    .nav-enter {
      -webkit-animation: fade-in-top var(--flui-header-nav-transition) both;
      animation: fade-in-top var(--flui-header-nav-transition) both;
    }

    .nav-leave {
      -webkit-animation: fade-out-top var(--flui-header-nav-transition) both;
      animation: fade-out-top var(--flui-header-nav-transition) both;
    }

    //  * animation fade-in-top

    @-webkit-keyframes fade-in-top {
      0% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
        opacity: 0;
      }

      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes fade-in-top {
      0% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
        opacity: 0;
      }

      100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }
    }

    //  * animation fade-out-top

    @-webkit-keyframes fade-out-top {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
        opacity: 0;
      }
    }

    @keyframes fade-out-top {
      0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
      }

      100% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
        opacity: 0;
      }
    }
  }
}
</style>
