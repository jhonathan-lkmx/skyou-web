<template>
  <nuxt-link class="btn" :to="url" :class="[type, display]">
    <slot></slot>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    url : {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
      default: 'primary'
    },
    label: {
      type: String,
      required: false,
    },
    display: {
      type: String,
      required: false,
    }
  }
}
</script>

<style lang="scss">
:root {
  --color-primary-hover: #00A4E0;
  --color-primary-disabled: #99E3FF;

}
  .btn {
    padding: 11px var(--f-gutter);
    text-decoration: none;
    max-width: fit-content;
    border-radius: 4px;

    &.primary {
      background: var(--color-primary-cyan-process);
      color: var(--color-neutral-10);
      text-transform: capitalize;

      &:hover {
        background: var(--color-primary-hover);
      }
      &:disabled {
        background: var(--color-primary-disabled);
      }
    }
    &.secondary {
      background: var(--color-neutral-08);
      color: var(--color-neutral-01);

      &:hover {
        color: var(--color-primary-fashion-fuchsia);
      }
      &:disabled {
        color: var(--color-neutral-06);
      }

      &:active {
        color: var(--color-primary-fashion-fuchsia);
      }
    }
    &.tertiary {
      background: transparent;
      color: var(--color-primary-cyan-process);

      &:hover {
        text-decoration-line: underline;
        background: var(--color-neutral-08);
      }
      &:disabled {
        color: var(--color-primary-disabled);
      }
    }
    &.full {
      max-width: 100%;
      text-align: center;
    }
  }

</style>