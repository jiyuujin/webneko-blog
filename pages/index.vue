<template>
  <main-template>
    <header-text />
    <div class="main">
      <top-list />
      <tags />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const TopList = () => import('~/components/post/TopList.vue')
const Tags = () => import('~/components/post/Tags.vue')
const HeaderText = () => import('~/components/layouts/HeaderText.vue')

@Component({
  async asyncData ({ store }) {
    await store.dispatch('product/initPosts', {
      'slug': ''
    })
  },
  components: {
    MainTemplate,
    TopList,
    Tags,
    HeaderText
  }
})
export default class Index extends Vue {}
</script>

<style scoped>
.main {
  margin: 24px 10% 8px;
  padding-top: 36px;
}
</style>
