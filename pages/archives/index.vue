<template>
  <main>
    <h2>Archives</h2>
    <p v-for="post in posts" :key="post.fields.title">
      <nuxt-link
        :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
      >
        {{ post.fields.title }}
      </nuxt-link>
    </p>

    <google-adsense
      ad-slot="5919567639"
      ad-format="auto"
      :ad-style="{ display: 'block' }"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchAllPosts } from '~/api/blog'
import { generalOg, twitterOg } from '~/utils/og.constants'
import Endpoints from '~/utils/endpoints.constants'

const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default Vue.extend({
  components: {
    GoogleAdsense
  },
  async asyncData({ $sentry }) {
    try {
      return {
        posts: await fetchAllPosts()
      }
    } catch (error) {
      $sentry.captureException(error)
    }
  },
  head() {
    return {
      title: 'アーカイヴ一覧',
      meta: [
        ...generalOg(
          'アーカイヴ一覧',
          'アーカイヴの記事を集めました',
          `${Endpoints.BASE_URL}archives`
        ),
        ...twitterOg('アーカイヴ一覧', 'アーカイヴの記事を集めました')
      ]
    }
  }
})
</script>
