<template>
  <div class="section">
    <div class="feeds">
      <post-card v-for="post in posts" :key="post.fields.title" :post="post" />
    </div>

    <div class="read-more">
      <nuxt-link :to="`/archive/${formatCurrentDate('YYYY-MM')}`" :title="`${formatCurrentDate('YYYY-MM')}の記事を見る`">
        <img
          v-if="mode === 'light'"
          src="/icon/archive-black.svg"
          alt="archive"
          decoding="async"
          :style="{ width: '40px' }"
        />
        <img
          v-if="mode === 'dark'"
          src="/icon/archive-white.svg"
          alt="archive"
          decoding="async"
          :style="{ width: '40px' }"
        />
        <span>これまでの記事</span>
      </nuxt-link>
    </div>

    <google-adsense
      ad-slot="5919567639"
      ad-format="auto"
      :ad-style="{ display: 'block' }"
    />

    <history-tags :tags="tags" />
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/hooks/useAppTheme'
import useCalendar from '~/hooks/useCalendar'

import { fetchPosts, fetchTags } from '~/api/blog'

const HistoryTags = () => import('~/components/HistoryTags.vue')
const PostCard = () => import('~/components/PostCard.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default {
  components: {
    HistoryTags,
    PostCard,
    GoogleAdsense
  },
  setup(props, ctx) {
    const { mode } = useLayout()
    return { mode, ...useCalendar(props) }
  },
  async asyncData({ $sentry }) {
    try {
      return {
        posts: await fetchPosts(),
        tags: await fetchTags()
      }
    } catch (error) {
      $sentry.captureException(error)
    }
  }
}
</script>
