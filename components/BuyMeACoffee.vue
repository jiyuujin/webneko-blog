<template>
  <a
    class="bmc-button"
    target="_blank"
    href="https://www.buymeacoffee.com/VqwL7dpxl"
  >
    <img
      src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg"
      alt="Buy me a coffee"
      decoding="async"
    >
    <span style="margin-left:5px">
      Buy me a coffee
    </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    //
})
</script>

<style scoped>
.bmc-button img{
    width: 27px !important;
    margin-bottom: 1px !important;
    box-shadow: none !important;
    border: none !important;
    vertical-align: middle !important;
}

.bmc-button{
    line-height: 36px !important;
    height: 37px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    color: #fff !important;
    background-color: #BB5794 !important;
    border-radius: 3px !important;
    border: 1px solid transparent !important;
    padding: 0 9px !important;
    font-size: 17px !important;
    letter-spacing:-0.08px !important;
    box-shadow: 0 1px 2px rgba(190, 190, 190, 0.5) !important;
    -webkit-box-shadow: 0 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    margin: 0 auto !important;
    font-family: 'Lato', sans-serif !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    -o-transition: 0.3s all linear !important;
    -webkit-transition: 0.3s all linear !important;
    -moz-transition: 0.3s all linear !important;
    -ms-transition: 0.3s all linear !important;
    transition: 0.3s all linear !important;
}

.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
    -webkit-box-shadow: 0 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    text-decoration: none !important;
    box-shadow: 0 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    opacity: 0.85 !important;
    color: #fff !important;
}
</style>
