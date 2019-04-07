<template>
  <main-template>
    <header-text />
    <div class="main">
      <top />
      <tags />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const Top = () => import('~/components/post/Top.vue')
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
    Top,
    Tags,
    HeaderText
  },
  // computed: {
  //   ...mapState({
  //     'posts': (state: any) => state.product.posts
  //   })
  // }
})
export default class Index extends Vue {}
</script>

<style scoped>
.main {
  margin: 24px 10% 8px;
}
</style>
