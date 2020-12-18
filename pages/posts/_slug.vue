<template>
  <main-template v-if="currentPost">
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
        {{ getCurrentDate(currentPost.fields.publishDate) }}
      </div>
    </div>

    <loaded-markdown :body="currentPost.fields.body" />

    <div v-if="scraps" class="article">
      <div v-for="(scrap, index) in scraps" :key="index" class="post-detail">
        <div v-for="item in scrap" :key="item.id" class="scrap-item">
          <div class="scrap-item scrap-item_left">
            <div class="icon-box">
              <img
                :alt="item.data.name"
                :src="`/icon/bakeneko.svg`"
                width="40"
                height="40"
                class="icon"
              />
            </div>
            <div
              class="balloon"
              v-html="$md.render($sanitize(item.data.message))"
            />
            <div class="time">{{ dateTimeFormat(item.data.time) }}</div>
          </div>
        </div>
      </div>
    </div>

    <new-scrap v-if="currentPost.fields.category === 'Scrap'" :slug="slug" />

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

    <new-contact
      v-if="currentPost.fields.category !== 'Scrap'"
      :blog-title="currentPost.fields.title"
    />

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
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import useDate from '~/composables/date'

import { fetchPost, fetchPosts } from '~/repositories/blog'
import { fetchScraps } from '~/repositories/scrap'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PostCard = () => import('~/components/PostCard.vue')
const SocialMenu = () => import('~/components/SocialMenu.vue')
const NewContact = () => import('~/components/NewContact.vue')
const NewScrap = () => import('~/components/NewScrap.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const LoadedMarkdown = () => import('~/components/LoadedMarkdown.vue')
const BuyMeACoffee = () => import('~/components/BuyMeACoffee.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    PostCard,
    SocialMenu,
    NewContact,
    NewScrap,
    GoogleAdsense,
    LoadedMarkdown,
    BuyMeACoffee
  },
  async asyncData({ params }) {
    const isLatest: boolean = true
    return {
      slug: params.slug,
      currentPost: await fetchPost({
        slug: params.slug,
        ym: ''
      }),
      scraps: await fetchScraps(params.slug),
      latestPosts: await fetchPosts(isLatest)
    }
  },
  data() {
    return {
      isVertical: true,
      ...useDate()
    }
  },
  methods: {
    dateTimeFormat(dt: string) {
      return dayjs(dt).format('YYYY/MM/DD HH:mm')
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
