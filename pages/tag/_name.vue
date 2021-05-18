<template>
  <div class="section">
    <div class="tag-text">
      <div class="tag">
        {{ $route.params.name }}
      </div>
    </div>

    <div class="feeds">
      <post-card v-for="post in posts" :key="post.fields.title" :post="post" />
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
