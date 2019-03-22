<template>
  <div>
    <slot />
    <footer-text />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const FooterText = () => import('~/components/layouts/FooterText.vue')

@Component({
  components: {
    FooterText
  }
})
export default class MainTemplate extends Vue {}
</script>

<style scoped>

</style>
