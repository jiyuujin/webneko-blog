<template>
  <div class="buy-me-a-coffee">
    <a
      class="bmc-button"
      target="_blank"
      href="https://www.buymeacoffee.com/VqwL7dpxl"
    >
      <img
        src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
        alt="Buy me a coffee"
        decoding="async"
      />
      <span style="margin-left: 5px;">
        Buy me a coffee
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  //
})
</script>

<style lang="scss" scoped>
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
