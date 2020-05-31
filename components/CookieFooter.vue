<template>
  <j-cookie-footer
    :title="message"
    :url="url"
    @accept="$store.dispatch('product/accept', true)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      message:
        'あなたがこのサイト上でベストな体験ができるようCookieを使用しています',
      url: 'https://nekohack-privacy-policy.netlify.app/'
    }
  }
})
</script>
