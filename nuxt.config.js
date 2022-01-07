export default {
  // Target: https://go.nuxtjs.dev/config-target
  ssr: true,
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'SKYOU',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_skyou.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // "~@lkmx/flare/src/flare"
  css: [
    '@lkmx/flare/src/flare.scss',
    '~/assets/sass/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/flare',
    '~/plugins/cs-api.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // Adding Google font families: https://google-fonts.nuxtjs.org/options
  googleFonts: {
    families: {
      Roboto: [300, 500],
      'Comfortaa': [300, 400, 500, 600, 700],
    }
  }  
}
