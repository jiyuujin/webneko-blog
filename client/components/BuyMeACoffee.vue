<template>
  <div class="buy-me-a-coffee">
    <a
      href="https://www.buymeacoffee.com/VqwL7dpxl"
      title="BuyMeACoffeeで支払う"
      role="button"
      aria-pressed="true"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        v-if="isLight"
        src="/icon/buy_me_a_coffee-black.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
      <img
        v-if="isDark"
        src="/icon/buy_me_a_coffee-white.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/hooks/useAppTheme'

export default {
  setup() {
    const { mode } = useLayout()
    const isLight =
      !process.server &&
      window.matchMedia('(prefers-color-scheme: dark)').matches === false
    const isDark =
      !process.server &&
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    return { mode, isLight, isDark }
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
