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

@media screen and (prefers-reduced-motion: reduce) {
  .bmc-button {
    box-sizing: border-box;
    display: inline-flex;
    height: 37px;
    padding: 0 9px;
    margin: 0 auto;
    font-family: 'Lato', sans-serif;
    font-size: 17px;
    line-height: 36px;
    color: #fff;
    text-decoration: none;
    letter-spacing: -0.08px;
    background-color: #bb5794;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgba(190, 190, 190, 0.5);
    transition: none;

    img {
      width: 27px;
      margin-bottom: 1px;
      vertical-align: middle;
      border: none;
      box-shadow: none;
    }
  }
}

.bmc-button {
  box-sizing: border-box;
  display: inline-flex;
  height: 37px;
  padding: 0 9px;
  margin: 0 auto;
  font-family: 'Lato', sans-serif;
  font-size: 17px;
  line-height: 36px;
  color: #fff;
  text-decoration: none;
  letter-spacing: -0.08px;
  background-color: #bb5794;
  border: 1px solid transparent;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(190, 190, 190, 0.5);
  transition: 0.3s all linear;

  img {
    width: 27px;
    margin-bottom: 1px;
    vertical-align: middle;
    border: none;
    box-shadow: none;
  }
}

.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  color: #fff;
  text-decoration: none;
  box-shadow: 0 1px 2px 2px rgba(190, 190, 190, 0.5);
  opacity: 0.85;
}
</style>
