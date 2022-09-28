<template>
  <main>
    <div v-if="currentPost" class="section">
      <notify-alert
        v-if="errorType(new Date(currentPost?.date)) !== 'normal'"
        :title="currentPost?.title"
        :error-type="errorType(new Date(currentPost?.date))"
      />

      <div class="cover">
        <!--
        <template v-if="currentPost.fields.heroImage">
          <img
            :src="currentPost.fields.heroImage.fields.file.url"
            :alt="currentPost.fields.title"
            decoding="async"
          />
        </template>
        -->

        <div class="cover-title">
          {{ currentPost?.title }}
        </div>

        <div class="cover-date">
          <div v-if="USE_CONTENT">
            {{ new Date(currentPost?.date).toLocaleDateString() }}
          </div>
          <div v-if="USE_CONTENTFUL">
            {{ new Date(currentPost?.publishDate).toLocaleDateString() }}
          </div>
        </div>

        <div class="cover-tags">
          <div v-for="tag in currentPost?.tags" :key="tag" class="tag">
            {{ tag }}
          </div>
        </div>
      </div>

      <div v-if="USE_CONTENTFUL">
        <loaded-markdown :body="currentPost?.body" />
      </div>
      <div v-if="USE_CONTENT">
        <loaded-markdown>{{ currentPost?.body }}</loaded-markdown>
      </div>

      <social-menu
        :slug-text="currentPost?.slug"
        :title="currentPost?.title"
        :is-vertical="!isVertical"
      />

      <buy-me-a-coffee />

      <stripe-link />

      <google-adsense />

      <div v-if="SHOW_LATEST_POSTS">
        <div class="latest-article">
          <h2 class="latest-article-title">あわせてよみたい..</h2>
          <div class="feeds">
            <post-card
              v-for="post in latestPosts[0].children"
              :key="post?.title"
              :post="post"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchPost, useFetchPosts } from '~/hooks/useBlogData'
import Endpoints from '~/utils/endpoints.constants'
import { generalOg, twitterOg } from '~/utils/og.constants'
import { USE_CONTENT, USE_CONTENTFUL, SHOW_LATEST_POSTS } from '~/utils/feature.constants'

import NotifyAlert from '~/components/NotifyAlert.vue'
import PostCard from '~/components/PostCard.vue'
import SocialMenu from '~/components/SocialMenu.vue'
import LoadedMarkdown from '~/components/LoadedMarkdown.vue'
import BuyMeACoffee from '~/components/BuyMeACoffee.vue'
import StripeLink from '~/components/StripeLink.vue'
import GoogleAdsense from '~/components/GoogleAdsense.vue'

const isVertical = ref(true)

const currentPost = await useFetchPost()

const latestPosts = await useFetchPosts(true)

const errorType = (d: Date) => {
  if (d.getFullYear() + 1 < new Date().getFullYear()) {
    if (d.getFullYear() + 3 < new Date().getFullYear()) return 'error'
    return 'warning'
  }
  return 'normal'
}

useHead({
  title: (USE_CONTENT && !USE_CONTENTFUL) ? currentPost.value.title : currentPost.title,
  meta: [
    ...generalOg(
      (USE_CONTENT && !USE_CONTENTFUL) ? currentPost.value.title : currentPost.title,
      (USE_CONTENT && !USE_CONTENTFUL) ? currentPost.value.description : currentPost.description,
      (USE_CONTENT && !USE_CONTENTFUL) ? `${Endpoints.BASE_URL}posts/${currentPost.value.slug}` : `${Endpoints.BASE_URL}posts/${currentPost.slug}`,
      (USE_CONTENT && !USE_CONTENTFUL) ? `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.value.slug}.jpg` : `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.slug}.jpg`,
    ),
    ...twitterOg(
      (USE_CONTENT && !USE_CONTENTFUL) ? currentPost.value.title : currentPost.title,
      (USE_CONTENT && !USE_CONTENTFUL) ? currentPost.value.description : currentPost.description,
      (USE_CONTENT && !USE_CONTENTFUL) ? `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.value.slug}.jpg` : `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.slug}.jpg`,
    )
  ]
})
</script>
