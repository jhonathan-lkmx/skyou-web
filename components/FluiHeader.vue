<template>
  <header class="flui-header" :class="this.isNavOpen ? 'bg-transparent':''">
    <!-- Toogle button -->
    <button v-on:click="toggleMenu" class="flui-header__toggle">
      <img src="../assets/img/icon-menu-open.svg" v-if="!isNavOpen" alt="Menu" />
      <img src="../assets/img/icon-menu-close.svg" v-if="isNavOpen" alt="Menu" />
    </button>

    <!-- Logo -->
    <div class="flui-header__logo-container">
      <slot name="headerLogo">
        <nuxt-link to="/">
          <img
            class="flui-header__logo-container__img"
            :src="require(`../assets/img/${logo}`)"
            alt="Logo home page"
          />
        </nuxt-link>
      </slot>
    </div>

    <!-- Main navigation -->
    <nav :class="initMenu" class="flui-header__navigation" aria-label="main-navigation">
      <!-- <nuxt-link :to="nav.to" v-for="(nav, index) in mainNavigation" :key="index">
        <slot name="headerMainNavigation">{{ nav.title }}</slot>
      </nuxt-link> -->
      <flui-header-nav></flui-header-nav>
    </nav>

    <!-- Actions -->
    <nav class="flui-header__actions" aria-label="actions">
      <a v-for="(action, index) in actions" :key="index" :href="action.to">
        <slot name="headerActions">{{ action.title }}</slot>
      </a>
    </nav>

  </header>
</template>

<script>
export default {
  data: function () {
    return {
      isNavOpen: false,
    };
  },
  props: {
    mode: {
      type: String,
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    mainNavigation: {
      type: Array,
      required: false,
      to: [
        {
          title: String,
          url: String,
        },
      ],
    },
    actions: {
      type: Array,
      required: false,
      to: [
        {
          title: String,
          url: String,
        },
      ],
    },
  },
  methods: {
    toggleMenu() {
      this.isNavOpen = !this.isNavOpen;
      // let booleanx = true;
      // console.log(this.isNavOpen);

      const headerEl = document.querySelector('.flui-header');
      const navAnchorEl = document.querySelectorAll('.flui-header__navigation a');
      const bodyEl = document.querySelector('body');
      console.log(bodyEl);
      const navIsClosed = () => {
        this.isNavOpen = false;
        bodyEl.classList.remove('fixed');
      };
      if (this.isNavOpen) {
       bodyEl.classList.add('fixed');
        headerEl.style.setProperty(
          '--calcHeaderHeight',
          headerEl.offsetHeight + 'px'
        );
        for (const anchor of navAnchorEl) {
          anchor.addEventListener('click', navIsClosed);
        }
      } else {
        navIsClosed();
      }
    },
  },
  computed: {
    initMenu() {
      return {
        'navIsOpen': this.isNavOpen,
      }
    }
  },
};
</script>

<style lang="scss">
@import '@lkmx/flare/src/functions/_respond-to.scss';

:root {
  --flui-header-background-color: var(--f-header-background-color);
  --flui-header-toggle-background-color-hover: var(--color-gradient-01);
  --flui-header-height: 100%;
  --flui-header-text-color: var(--f-header-text-color);
  --flui-header-logo-width: 148px;
  --flui-navigation-background-color: var(--color-neutral-10);
}

.flui-header {
  display: grid;
  grid-template-columns: 240px 1fr 240px;
  @include respond-to('<=l') {
    grid-template-columns: 1fr auto 1fr;
  }
  grid-auto-flow: column;
  align-items: center;
  z-index: 10;
  background: var(--flui-header-background-color);
  padding: 0;
  min-height: var(--f-gutter-xl);
  height: var(--flui-header-height);
  color: var(--flui-header-text-color);
  position: relative;

  a {
    color: var(--flui-color-white);
  }

  @include respond-to('<=m') {
    grid-template-columns: 1fr 170 1fr;
  }
  &.bg-transparent {
    background-color: var(--color-neutral-10);
  }
  &__toggle {
    display: none;
    margin: 0;

    @include respond-to('<=m') {
      display: grid;
      gap: var(--f-gutter);
      align-items: center;
      justify-content: center;
      justify-items: start;
      grid-template-columns: 1fr;
      grid-auto-flow: row;

      /* height: var(--f-gutter-xl);
      width: var(--f-gutter-xl); */
      background-color: transparent;

      padding: 20px var(--f-gutter);
    }
    &:hover {
      background: var(--flui-header-toggle-background-color-hover);
    }
  }

  .flui-header__logo-container {
    display: grid;
    gap: var(--f-gutter);
    align-items: center;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-auto-flow: row;
    height: 100%;
    padding: 10px 80px 10px 10px;
    @include respond-to('<=l') {
      padding: 10px;
    }
    &__img {
      width: var(--flui-header-logo-width);
      height: 100%;
      padding: 0;
      object-fit: contain;

      @include respond-to('<=m') {
        width: 150px;
        // top: var(--f-gutter);
        margin-left: auto;
        margin-right: auto;
      }
    }
    @include respond-to('<=m') {
      padding: 10px;
      height: 64px;
    }
  }

  &__navigation {
    display: grid;
    align-content: center;
    grid-auto-flow: column;
    justify-content: center;
    height: 100%;

    @include respond-to('<=m') {
      display: none;
      align-content: start;
      &.navIsOpen {
        display: grid;
        gap: var(--f-gutter);
        align-items: center;
        justify-content: center;
        justify-items: center;
        grid-template-columns: 1fr;
        grid-auto-flow: row;
        grid-template-rows: repeat(5, minmax(10px, 60px));
        z-index: -1;
        background: var(--flui-color-black);
        position: fixed;
        overflow-y: scroll;
        top: var(--f-header-height);
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: calc(100vh - var(--calcHeaderHeight));
        background: var(--flui-navigation-background-color);
        padding: var(--f-gutter) 0;

        &::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
      }
    }

    a {
      text-decoration: none;
    }
  }
  &__actions {
    display: grid;
    gap: var(--f-gutter);
    align-items: center;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-auto-flow: column;
    a {
      text-decoration: none;
    }
  }
}
</style>
