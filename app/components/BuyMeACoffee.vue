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
      <BuyMeACoffeeLogo />
      <span>{{ `BuyMeACoffeeで支払う` }}</span>
    </a>
  </div>
</template>

<script lang="ts">
import BuyMeACoffeeLogo from '~/assets/buy_me_a_coffee_logo.svg'

export default {
  components: {
    BuyMeACoffeeLogo
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
