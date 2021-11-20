<template>
  <div class="stripe">
    <a
      href="https://buy.stripe.com/3cs8xk7S55pxg2QdQQ"
      title="Stripeで支払う"
      role="button"
      aria-pressed="true"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        v-if="isLight"
        src="/icon/stripe-black.svg"
        alt="Stripe"
        decoding="async"
      />
      <img
        v-if="isDark"
        src="/icon/stripe-white.svg"
        alt="Stripe"
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
