<template>
  <div v-if="currentPost">
    <div class="cover">
      <template v-if="currentPost.fields.heroImage">
        <img
          :src="currentPost.fields.heroImage.fields.file.url"
          :alt="currentPost.fields.title"
          decoding="async"
        />
      </template>

      <div class="cover-title">
        {{ currentPost.fields.title }}
      </div>

      <div class="cover-date">
        {{ new Date(currentPost.fields.publishDate).toLocaleDateString() }}
      </div>
    </div>

    <loaded-markdown :body="currentPost.fields.body" />

    <google-adsense
      ad-slot="5228106955"
      ad-format="fluid"
      ad-layout="in-article"
      :ad-style="{ display: 'block', 'text-align': 'center' }"
    />

    <social-menu
      :slug-text="currentPost.fields.slug"
      :title="currentPost.fields.title"
      :is-vertical="!isVertical"
    />

    <buy-me-a-coffee />

    <div class="latest-article">
      <h2 class="latest-article-title">あわせてよみたい..</h2>
      <div v-for="post in latestPosts" :key="post.fields.title" class="items">
        <nuxt-link
          :key="post.fields.title"
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

import { fetchPost, fetchPosts } from '~/api/blog'

const PostCard = () => import('~/components/PostCard.vue')
const SocialMenu = () => import('~/components/SocialMenu.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const LoadedMarkdown = () => import('~/components/LoadedMarkdown.vue')
const BuyMeACoffee = () => import('~/components/BuyMeACoffee.vue')

export default Vue.extend({
  components: {
    PostCard,
    SocialMenu,
    GoogleAdsense,
    LoadedMarkdown,
    BuyMeACoffee
  },
  async asyncData({ params, $sentry }) {
    const isLatest: boolean = true
    try {
      return {
        slug: params.slug,
        currentPost: await fetchPost({
          slug: params.slug,
          ym: ''
        }),
        latestPosts: await fetchPosts(isLatest)
      }
    } catch (error) {
      $sentry.captureException(error)
    }
  },
  data() {
    return {
      isVertical: true
    }
  },
  head() {
    let heroImage = ''
    if (this.currentPost.fields.heroImage) {
      heroImage = `https:${this.currentPost.fields.heroImage.fields.file.url}`
    }
    return {
      title: this.currentPost.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPost.fields.description
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: this.currentPost.fields.title
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.currentPost.fields.description
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:image', name: 'twitter:image', content: heroImage },
        { hid: 'og:type', name: 'og:type', content: 'article' },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.currentPost.fields.title
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.currentPost.fields.description
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: `/${this.currentPost.fields.slug}` || ''
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: heroImage ? heroImage : '/icon/webneko-blog-white.png'
        }
      ]
    }
  }
})
</script>
