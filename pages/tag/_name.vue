<template>
  <main-template>
    <div class="main">
      <div class="tag-text">
        <div class="tag">
          {{ $route.params.name }}
        </div>
      </div>

      <div class="top">
        <div v-for="post in posts" :key="post.fields.title" class="items">
          <nuxt-link
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
          >
            <post-card :post="post" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPostsByTag } from '~/repositories/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PostCard = () => import('~/components/PostCard.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    PostCard
  },
  async asyncData({ route }) {
    return {
      posts: await fetchPostsByTag(route.params.name)
    }
  }
})
</script>
