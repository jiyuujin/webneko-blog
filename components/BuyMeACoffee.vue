<template>
  <div class="buy-me-a-coffee">
    <a
      href="https://www.buymeacoffee.com/VqwL7dpxl"
      role="button"
      aria-pressed="true"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        v-if="!isClient"
        src="/icon/buy_me_a_coffee-white.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
      <img
        v-else
        src="/icon/buy_me_a_coffee-black.svg"
        alt="Buy me a coffee"
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
