<template>
  <main-template v-if="currentPost">
    <header-text />

    <div class="cover">
      <template v-if="currentPost.fields.heroImage">
        <img
          :src="currentPost.fields.heroImage.fields.file.url"
          :alt="currentPost.fields.title"
          decoding="async"
        >
      </template>

      <div class="title">
        {{ currentPost.fields.title }}
      </div>

      <div class="date">
        {{ getDate(currentPost.fields.publishDate) }}
      </div>
    </div>

    <div class="article">
      <loaded-markdown
        :body="currentPost.fields.body"
      />

      <google-adsense
        slot="5228106955"
        ad-format="fluid"
        ad-layout="in-article"
        :ad-style="{ display: 'block', 'text-align': 'center' }"
      />

      <social-menu
        :slug-text="currentPost.fields.slug"
        :title="currentPost.fields.title"
        :is-vertical="!isVertical"
      />

      <div class="buy-me-a-coffee">
        <buy-me-a-coffee />
      </div>

      <div>
        <p>
          コメントを残す
        </p>
        <new-contact
          :blog-title="currentPost.fields.title"
        />
      </div>

      <div class="late-article">
        <h2 class="title">
          あわせてよみたい..
        </h2>
        -----
        <div
          v-for="post in latestPosts"
          :key="post.fields.title"
          class="item"
        >
          <nuxt-link
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}"
          >
            <div class="item-title">
              {{ post.fields.title }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

import { fetchPost, fetchPosts } from '~/repositories/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const SocialMenu = () => import('~/components/SocialMenu.vue')
const NewContact = () => import('~/components/NewContact.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const LoadedMarkdown = () => import('~/components/LoadedMarkdown.vue')
const BuyMeACoffee = () => import('~/components/BuyMeACoffee.vue')

export default Vue.extend({
    components: {
        MainTemplate,
        HeaderText,
        SocialMenu,
        NewContact,
        GoogleAdsense,
        LoadedMarkdown,
        BuyMeACoffee
    },
    async asyncData({ params }) {
        const isLatest: boolean = true
        return {
            currentPost: await fetchPost({
                slug: params.slug,
                ym: ''
            }),
            latestPosts: await fetchPosts(isLatest)
        }
    },
    data() {
        return {
            isVertical: true
        }
    },
    methods: {
        getDate(date: Date) {
            return dayjs(date).format('MM月 DD日')
        }
    },
    head() {
        let heroImage = ''
        if ((this as any).currentPost.fields.heroImage) {
            heroImage = `https:${(this as any).currentPost.fields.heroImage.fields.file.url}`
        }
        return {
            title : (this as any).currentPost.fields.title,
            meta: [
                { hid: 'description', name: 'description', content: (this as any).currentPost.fields.description },
                { hid: 'twitter:title', name: 'twitter:title', content: (this as any).currentPost.fields.title },
                { hid: 'twitter:description', name: 'twitter:description', content: (this as any).currentPost.fields.description },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:image', name: 'twitter:image', content: heroImage },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: (this as any).currentPost.fields.title },
                { hid: 'og:description', name: 'og:description', content: (this as any).currentPost.fields.description },
                { hid: 'og:url', name: 'og:url', content: `/${(this as any).currentPost.fields.slug}` || '' },
                { hid: 'og:image', name: 'og:image', content: heroImage ? heroImage : '/icon/webneko-blog-white.png' }
            ]
        }
    }
})
</script>
