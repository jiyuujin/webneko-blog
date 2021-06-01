<template>
  <div class="stripe">
    <a
      href="https://buy.stripe.com/3cs8xk7S55pxg2QdQQ"
      role="button"
      aria-pressed="true"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        v-if="!isClient"
        src="/icon/stripe-white.svg"
        alt="Stripe"
        decoding="async"
      />
      <img
        v-else
        src="/icon/stripe-black.svg"
        alt="Stripe"
        decoding="async"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api'

import { useLayout } from '~/composables/layout'

export default {
  setup() {
    const { mode } = useLayout()
    const isClient =
      !process.server &&
      window.matchMedia('(prefers-color-scheme: dark)').matches === true &&
      ref(true)
    return { mode, isClient }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 48px;
  margin-bottom: 1px;
  vertical-align: middle;
  border: none;
  box-shadow: none;
}
</style>
