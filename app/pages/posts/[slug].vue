<template>
  <main>
    <div v-if="currentPost" class="section">
      <notify-alert
        v-if="errorType(new Date(currentPost.fields.publishDate)) !== 'normal'"
        :title="currentPost.fields.title"
        :error-type="errorType(new Date(currentPost.fields.publishDate))"
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
          {{ currentPost.fields.title }}
        </div>

        <div class="cover-date">
          {{ new Date(currentPost.fields.publishDate).toLocaleDateString() }}
        </div>

        <div class="cover-tags">
          <div v-for="tag in currentPost.fields.tags" :key="tag" class="tag">
            {{ tag }}
          </div>
        </div>
      </div>

      <loaded-markdown :body="currentPost.fields.body" />

      <social-menu
        :slug-text="currentPost.fields.slug"
        :title="currentPost.fields.title"
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
              :key="post.title"
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
import { SHOW_LATEST_POSTS } from '~/utils/feature.constants'

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
  meta: [
    ...generalOg(
      currentPost.fields?.title,
      currentPost.fields?.description,
      `${Endpoints.BASE_URL}posts/${currentPost.fields?.slug}`,
      `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.fields?.slug}.jpg`,
    ),
    ...twitterOg(
      currentPost.fields?.title,
      currentPost.fields?.description,
      `${Endpoints.OG_BASIC_ENDPOINT}${currentPost.fields?.slug}.jpg`,
    )
  ]
})
</script>
