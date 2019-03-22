<template>
  <main-template>
    <privacy-policy />
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const PrivacyPolicy = () => import('~/components/atoms/PrivacyPolicy.vue')

@Component({
  components: {
    PrivacyPolicy,
    MainTemplate
  },
  head() {
    return {
      title: 'プライバシーポリシー'
    }
  }
})
export default class Index extends Vue {}
</script>

<style scoped>

</style>
