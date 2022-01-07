<template>
  <div class="flui-breadcrumb">
    <nuxt-link
      v-for="(breadcrumb, index) in dataBreadcrumb"
      :key="index"
      class="flui-breadcrumb__link"
      :to="breadcrumb.url"
      >{{ breadcrumb.title }}
      <svg
        class="flui-breadcrumb__link__chevron"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33325 4.27618L6.27606 3.33337L10.9901 8.04742L6.27606 12.7615L5.33325 11.8187L9.10449 8.04742L5.33325 4.27618Z"
          fill="#5E7187"
        />
      </svg>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      breadcrumbs: [
        {
          title: "Products",
          breadcrumbUrl: "/products",
        },
        {
          title: "Hoodies and Sweatshirts",
          breadcrumbUrl: "/category",
        },
      ],
    };
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    dataBreadcrumb: {
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
    close: function () {
      this.breadcrumbIsVisible = false;
    },
  },
};
</script>

<style lang="scss">
@import "@lkmx/flare/src/functions/_respond-to.scss";
:root {
  --flui-breadcrumb-background: var(--color-neutral-09);
  --flui-breadcrumb-link-color: var(--color-neutral-04);
  --flui-breadcrumb-link-color-selected: var(---color-neutral-01);
  --flui-breadcrumb-text-align: left;
  --flui-breadcrumb-padding: 6px;
}
.flui-breadcrumb {
  background: var(--flui-breadcrumb-background);
  padding: var(--flui-breadcrumb-padding);
  gap: var(--f-gutter-xxs);
  display: inline-grid;
  align-content: start;
  align-items: center;
  text-align: var(--flui-breadcrumb-text-align);
  grid-auto-flow: column;
  * {
    margin: 0;
  }
  &__link {
    color: var(--flui-breadcrumb-link-color);
    text-decoration: none;
    display: inline-grid;
    grid-auto-flow: column;
    gap: var(--f-gutter-xxs);
    align-content: start;
    align-items: center;
    &:last-child {
      color: var(--flui-breadcrumb-link-color-selected) !important;
      .flui-breadcrumb__link__chevron {
        display: none;
      }
    }
    &:visited {
      color: var(--flui-breadcrumb-link-color);
    }
    &:last-child {
      @include respond-to("<=s") {
        display: none;
      }
    }
  }
}
</style>

