<template>
  <main-template>
    <div class="main">
      <header-text />

      <div class="top">
        <div
          v-for="(post, index) in posts"
          :key="post.fields.title"
          :style="index < count ? 'margin: 12px 4%;' : ''"
          class="card"
        >
          <template v-if="index < count">
            <nuxt-link
              :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
            >
              <div class="title">
                {{ post.fields.title }}
              </div>
            </nuxt-link>
            <div class="date">
              {{ getDate(post.fields.publishDate) }}
            </div>
            <div class="description">
              {{ post.fields.description }}
            </div>
          </template>
        </div>
      </div>

      <google-adsense
        slot="5919567639"
        ad-format="auto"
        :ad-style="{ display: 'block' }"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import { fetchPosts } from '~/repositories/blog'
import { PAGE } from '~/services/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    HeaderText,
    GoogleAdsense
  },
  async asyncData() {
    return {
      posts: await fetchPosts()
    }
  },
  data() {
    return {
      count: PAGE
    }
  },
  methods: {
    getDate(date: Date) {
      return dayjs(date).format('MM月 DD日')
    }
  }
})
</script>
