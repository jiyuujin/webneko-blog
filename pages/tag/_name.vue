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
import { generalOg, twitterOg } from '~/utils/og.constants'
import Endpoints from '~/utils/endpoints.constants'

const PostCard = () => import('~/components/PostCard.vue')

export default Vue.extend({
  components: {
    PostCard
  },
  async asyncData({ route }) {
    return {
      tagName: route.params.name,
      posts: await fetchPostsByTag(route.params.name)
    }
  },
  head() {
    return {
      title: (this as any).tagName,
      meta: [
        ...generalOg(
          `${(this as any).tagName} 記事一覧`,
          `${(this as any).tagName} の記事を集めました`,
          `${Endpoints.TAG_BASE_URL}${(this as any).tagName}`
        ),
        ...twitterOg(
          `${(this as any).tagName} 記事一覧`,
          `${(this as any).tagName} の記事を集めました`,
        )
      ]
    }
  }
})
</script>
