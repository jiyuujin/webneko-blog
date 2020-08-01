<template>
  <div>
    <transition-group name="fade">
      <mode-change key="top-mode-change" />
      <nuxt key="top-nuxt" />
    </transition-group>
    <cookie-footer v-if="!isExistedCookie" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { provideLayout } from '~/composables/layout'
import UtilModule from '~/composables/util'

const ModeChange = () => import('~/components/ModeChange.vue')
const CookieFooter = () => import('~/components/CookieFooter.vue')

export default defineComponent({
  components: {
    ModeChange,
    CookieFooter
  },
  setup(props: {}, ctx: SetupContext) {
    provideLayout()
    const utilModule = UtilModule(props, ctx)
    return { ...utilModule }
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
