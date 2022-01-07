// VIEWPORT CONFIG IMPORT
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// VUE IMPORT
import Vue from 'vue';

// FLARE IMPORT
import Page from "@lkmx/flare/src/core/Page.vue";
import Column from "@lkmx/flare/src/core/Columns.vue";
import Columns from "@lkmx/flare/src/core/Columns.vue";
import Block from "@lkmx/flare/src/core/Block.vue";

import SimpleLayout from "@lkmx/flare/src/layouts/SimpleLayout.vue";
import SidesLayout from "@lkmx/flare/src/layouts/SidesLayout.vue";

import SimpleHeader from "@lkmx/flare/src/components/SimpleHeader.vue";
import SimpleFooter from "@lkmx/flare/src/components/SimpleFooter.vue";

// import "../src/sass/style.scss";
// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
//   viewport: {
//     viewports: INITIAL_VIEWPORTS,
//   },
// };


const components = {
  Page, Columns, Column, Block, 
  SimpleLayout, SidesLayout,
  SimpleHeader, SimpleFooter,
};


for(const name in components) {
  Vue.component(name, components[name]);
};