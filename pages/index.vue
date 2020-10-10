<template>
  <main-template :tags="tags">
    <div class="main">
      <header-text />

      <div class="top">
        <template v-for="post in posts">
          <nuxt-link
            :key="post.fields.title"
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
          >
            <post-item :post="post" />
          </nuxt-link>
        </template>
      </div>

      <google-adsense
        ad-slot="5919567639"
        ad-format="auto"
        :ad-style="{ display: 'block' }"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPosts, fetchTags } from '~/repositories/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PostItem = () => import('~/components/PostItem.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    PostItem,
    HeaderText,
    GoogleAdsense
  },
  async asyncData() {
    return {
      posts: await fetchPosts(),
      tags: await fetchTags()
    }
  }
})
</script>
