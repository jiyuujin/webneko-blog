<template>
  <div>
    <notice-bar />
    <main>
      <nav-text />
      <transition-group name="fade">
        <nuxt key="top-nuxt" />
      </transition-group>
      <footer-text />
      <cookie-footer-wrapper />
    </main>
  </div>
</template>

<script lang="ts">
import { provideLayout } from '~/hooks/useAppTheme'

const NoticeBar = () => import('~/components/NoticeBar.vue')
const NavText = () => import('~/components/NavText.vue')
const FooterText = () => import('~/components/FooterText.vue')
const CookieFooterWrapper = () => import('~/components/CookieFooterWrapper.vue')

export default {
  components: {
    NoticeBar,
    NavText,
    FooterText,
    CookieFooterWrapper
  },
  setup() {
    provideLayout()
  }
}
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
