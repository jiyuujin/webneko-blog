<template>
  <main-template>
    <div class="contact">
      <h2>
        お問い合わせ
      </h2>
      <p>
        お仕事のご依頼や当ブログに対するご提案などご気軽に。
      </p>
      <new
        category="manual"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const New = () => import('~/components/contact/New.vue')

@Component({
  components: {
    New,
    MainTemplate
  },
  head() {
    return {
      title: 'お問い合わせ'
    }
  }
})
export default class Index extends Vue {}
</script>

<style scoped>
.contact {
  text-align: center;
}
</style>
