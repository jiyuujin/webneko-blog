<template>
  <div class="main">
    <header-text />

    <div class="top">
      <div v-for="post in posts" :key="post.fields.title" class="items">
        <nuxt-link
          :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
        >
          <post-card :post="post" />
        </nuxt-link>
      </div>
      <div class="read-more">
        <nuxt-link :to="`/archives/${getCurrentMonth}`">
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
import { computed } from '@vue/composition-api'
import dayjs from 'dayjs'

import { useLayout } from '~/composables/layout'

import { fetchPosts, fetchTags } from '~/api/blog'

const HistoryTags = () => import('~/components/HistoryTags.vue')
const PostCard = () => import('~/components/PostCard.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default {
  components: {
    HistoryTags,
    PostCard,
    HeaderText,
    GoogleAdsense
  },
  setup(props, ctx) {
    const { mode } = useLayout()
    const getCurrentMonth = computed(() => {
      return dayjs().format('YYYY-MM')
    })
    return { mode, getCurrentMonth }
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
