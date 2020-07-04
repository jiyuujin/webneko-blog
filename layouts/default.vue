<template>
  <div>
    <a
      class="github-fork-ribbon"
      href="https://github.com/jiyuujin/webneko-blog"
      data-ribbon="Star on GitHub"
      title="Star on GitHub"
    >
      Fork me on GitHub
    </a>
    <transition name="fade">
      <nuxt />
    </transition>
    <cookie-footer v-if="!isExistedCookie" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCookie } from '~/services/cookie'

const CookieFooter = () => import('~/components/CookieFooter.vue')

export default Vue.extend({
  components: {
    CookieFooter
  },
  methods: {
    isExistedCookie() {
      getCookie()
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/ribbon';

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
