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
      <StripeLogo />
      <span>{{ `Stripeで支払う` }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import StripeLogo from '~/assets/stripe_logo.svg'

export default {
  components: {
    StripeLogo
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
