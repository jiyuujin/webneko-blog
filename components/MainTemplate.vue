<template>
  <div>
    <slot />
    <footer-text />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const FooterText = () => import('~/components/FooterText.vue')

export default Vue.extend({
    components: {
        FooterText
    }
})
</script>
