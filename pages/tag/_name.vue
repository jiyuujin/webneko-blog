<template>
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
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPostsByTag } from '~/api/blog'

const PostCard = () => import('~/components/PostCard.vue')

export default Vue.extend({
  components: {
    PostCard
  },
  async asyncData({ route }) {
    return {
      posts: await fetchPostsByTag(route.params.name)
    }
  }
})
</script>
