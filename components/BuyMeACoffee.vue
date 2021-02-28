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
        v-if="mode === 'light'"
        src="/icon/buy_me_a_coffee-black.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
      <img
        v-if="mode === 'dark'"
        src="/icon/buy_me_a_coffee-white.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/composables/layout'

export default {
  setup() {
    const { mode } = useLayout()
    return { mode }
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
