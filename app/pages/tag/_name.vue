<template>
  <main>
    <h2>{{ `Archive at ${$route.params.name}` }}</h2>
    <p>
      {{
        `このページは jiyuujin が書いてきた ${$route.params.name} の記事を収集したページです。`
      }}
    </p>

    <div class="feeds">
      <post-card v-for="post in posts" :key="post.fields.title" :post="post" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchAllPosts } from '~/api/blog'
import { generalOg, twitterOg } from '~/utils/og.constants'
import Endpoints from '~/utils/endpoints.constants'

const PostCard = () => import('~/components/PostCard.vue')

export default Vue.extend({
  components: {
    PostCard
  },
  async asyncData({ route, $config }) {
    return {
      tagName: route.params.name,
      posts: await fetchAllPosts($config, route.params.name)
    }
  },
  head() {
    return {
      title: (this as any).tagName,
      meta: [
        ...generalOg(
          `${(this as any).tagName} 記事一覧`,
          `${(this as any).tagName} の記事を集めました`,
          `${Endpoints.BASE_URL}tags/${(this as any).tagName}`
        ),
        ...twitterOg(
          `${(this as any).tagName} 記事一覧`,
          `${(this as any).tagName} の記事を集めました`
        )
      ]
    }
  }
})
</script>
