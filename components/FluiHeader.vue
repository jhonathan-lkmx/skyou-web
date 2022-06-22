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

    <div class="headerSession">

      <div class="hello-user" v-if="showSignOff">
        Hello, <span v-if="username">{{username}}</span>
      </div>

      <button @click="signOff" class="buttonLogout" aria-label="actions" v-if="showSignOff">
        Logout
      </button>

      <button @click="showLoginModal" class="buttonLogin" aria-label="actions" v-if="!showSignOff">
        Login
      </button>

    </div>

    <transition name="fade">
      <div class="modal-overlay" v-if="showModal"></div>
    </transition>

    <transition name="fade">
      <div class="modal" v-if="showModal">
        <div @click="showModal = false" class="modal__closeModal">
          <img src="../assets/img/icon-close.png" alt="">
        </div>
        <div class="modal__header">
          <div class="header">
            <p class="header__textLogin">Login</p>
          </div>
          <div class="imgLogo">
            <img src="../assets/img/logo.png" width="150px" height="44px" alt="">
          </div>

        </div>
        <div class="modal__form">
          <div class="modal__form__control">
            <label class="textLabel">Email address</label>
            <input class="formInput" type="text" placeholder="user@gmail.com" v-model="command.username"> 
          </div>
          <div class="modal__form__control">
            <label class="textLabel">Password</label>
            <div class="input-wrapper">
              <input class="formInput" :type="inputType" placeholder="*********" v-model="command.password" v-on:keyup.enter="signIn()"> 
              <img src="../assets/img/eye.svg" v-show="!showPassword" class="input-wrapper__icon" @click="toogleShowPassword">
              <img src="../assets/img/eye-off.svg" v-show="showPassword" class="input-wrapper__icon" @click="toogleShowPassword">
            </div>
          </div>
          <p class="modal__form__error" v-show="showTextError"> The username or password you have entered is incorrect </p>
        </div>
        <div class="modal__login">
          <button class="modal__login__textLogin" :disabled="isFormDisabled" @click="signIn()">
            Sign In
          </button>
        </div>
      </div>
    </transition>

  </header>
</template>

<script>
import btnLogin from './Btn.vue'
import api from '@/service/api';

export default {
  components:{
    btnLogin
  },
  data: function () {
    return {
      isNavOpen: false,
      showModal: false,
      command:{
        username: null,
        password: null
      },
      showPassword:false,
      showSignOff: false,
      showTextError: false,
      username: null
    }
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
    showLoginModal() {
      this.showTextError = false;
      this.showModal = true;
      this.$set(this.command, 'username', null);
      this.$set(this.command, 'password', null);
    },
    toogleShowPassword(){
      this.showPassword = !this.showPassword
    },
    showButtomSignIn(){
      this.showSignOff = !this.showSignOff
    },
    async signIn(){
      try {
        this.showTextError = false;
        await api.auth.login(this.command);
        this.loadSession();
        this.showModal = false;
      } catch( error ) {
        this.showTextError = true;
      }
    },
    async signOff() {
      this.showSignOff = !this.showSignOff
      api.auth.logout();
      this.$root.$emit('session-updated-logout');
    },
    async loadSession() {
      try {
        let isLogged = await api.auth.isLogged();
        let me = await api.auth.getMe();
        
        this.showSignOff = isLogged;
        this.username = me.first_name;

      } catch (error) {
        this.showSignOff = false;
        this.username = null;
      }
      this.$root.$emit('session-updated');
      
      
    }
  },
  computed: {
    initMenu() {
      return {
        'navIsOpen': this.isNavOpen,
      }
    },
    inputType(){
      return this.showPassword ? 'text' : 'password';
    },
    isFormDisabled(){
      return this.command.username == null || this.command.password == null
    }
  },
  mounted () {
    this.loadSession();
    this.$root.$on('session-login-open', this.showLoginModal);
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
  grid-template-columns: 240px 1fr 260px;
  @include respond-to('<=l') {
    grid-template-columns: 1fr auto 1fr;
  }
  grid-auto-flow: column;
  align-items: center;
  z-index: 10;
  background: var(--flui-header-background-color);
  padding: 0;
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
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
    }
  }

  .headerSession {
    text-align: right;
    padding-right: 0.75rem;
    @include respond-to('<=m'){
      display: none;
    }
    @include respond-to('<=s'){
      display: none;
    }

    .hello-user {
      display: inline-block;
      margin-left: 1rem;
      span {
        color: var(--color-primary-fashion-fuchsia);;
      }
    }

    .buttonLogin,
    .buttonLogout {
      cursor: pointer;
      background-color: var(--color-neutral-09);
      border: 1px solid var(--color-primary-fashion-fuchsia); 
      color: var(--color-neutral-01);
      border-radius: 5px;
      margin-top: 10px;
      margin-left: 1rem;
      padding: 0.5rem 1rem;

      &:hover { 
        background-color: #d6d6d6;
      }
    }

    .buttonSignIn{
      background-color: var(--color-primary-fashion-fuchsia);
      color: white;
      border-radius: 5px;
      margin-top: 10px;
      margin-right: 20px;
      margin-left: 30%;
      @include respond-to('<=m'){
        margin-left: 35%;
        @include respond-to('<=s'){
          margin-left: 40%;
        }
      }
    }

  }

  .modal-overlay{
    position: fixed;
    position: device-fixed;
    background-color: rgba(#1E292F, 0.7);
    width: 100%;
    height: 200%;
    left: 0;
  }

  .modal{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 48px 48px;
    position: fixed;
    width: 480px;
    @include respond-to('<=m'){
      width: 90%;
      padding: 15px 36px 36px;
      @include respond-to('<=s'){
        width: 80%;
        padding: 10px 24px 24px;
      }
    }
    height: auto;   
    background: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-neutral-10);

    &__closeModal{
      width: 100%;
      display: flex;
      justify-content: right;
      margin-top: 14px;
      margin-bottom: 20px;
    }

    &__header{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;


      .header{
        text-align: left;
        display: flex;
        align-items: center;

        &__textLogin{
          font-family: Comfortaa;
          font-style: normal;
          font-weight: bold;
          font-size: 30px;
          line-height: 130%;
          color: var(--color-primary-fashion-fuchsia);
        }
      }

      .imgLogo{
        display: flex;
        justify-content: right;
      }
    }

    &__form{
      width: 100%;

      &__error{
        //styleName: small/normal;
        font-family: Roboto;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 14px;
        letter-spacing: 0px;
        text-align: left;
        color: red;
      }

      &__control{
        margin-top: 30px;
        
        .formInput{
          width: 100%;
          margin-bottom: 10px;
          height: 45px;
          border-radius: 5px;
        }
        
        .input-wrapper {
          position: relative;

          &__icon {
            color: #191919;
            position: absolute;
            width: 30px;
            height: 30px;
            left: 12px;
            top: 50%;
            left: unset;
            right: 12px;
            transform: translateY(-50%);
          }
        }
      }
    }

    &__login{
      width: 100%;
      height: 50px;
      background-color: var(--color-primary-fashion-fuchsia);
      display: flex;
      justify-content: center;
      border-radius: 5px;
      margin-top: 15px;

      button {
        text-transform: uppercase;
        border-radius: 15px;
        text-align: center;
        background-color: var(--blue-light);
        color: white;
        cursor: pointer;
        width: 100%;
        height: 50px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
