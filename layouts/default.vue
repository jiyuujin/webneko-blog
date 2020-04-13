<template>
  <div>
    <transition name="fade">
      <nuxt />
    </transition>
    <cookie-footer v-if="!$store.state.product.isCookieAccepted" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const CookieFooter = () => import('~/components/CookieFooter.vue')

export default Vue.extend({
  components: {
    CookieFooter
  }
})
</script>

<style>
html {
  font-family: Futura, 'Trebuchet MS', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
