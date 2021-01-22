<template>
  <cookie-footer
    name="webneko-blog-cookie"
    title="あなたがこのサイト上でベストな体験ができるようCookieを使用しています"
    url="https://nekohack-privacy-policy.netlify.app"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import {
  applyPolyfills,
  defineCustomElements
} from '@nekohack/footer-ui/loader'

Vue.config.ignoredElements = ['cookie-footer']

export default Vue.extend({
  mounted() {
    applyPolyfills().then(() => {
      defineCustomElements()
    })
  }
})
</script>
