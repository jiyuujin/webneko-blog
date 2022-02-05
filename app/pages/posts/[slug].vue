<template>
  <main>
    <div v-if="currentPost" class="section">
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

      <div class="latest-article">
        <h2 class="latest-article-title">あわせてよみたい..</h2>
        <div class="feeds">
          <post-card
            v-for="post in latestPosts.items"
            :key="post.fields.title"
            :post="post"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { fetchPost, fetchPosts } from '~/api/blog'

import PostCard from '~/components/PostCard.vue'
import LoadedMarkdown from '~/components/LoadedMarkdown.vue'

const route = useRoute()
const slug = () => route.params.slug
const { data: currentPost } = await useAsyncData('currentPost', () => {
  return fetchPost(route.params)
})

const { data: latestPosts } = await useAsyncData('latestPosts', () => {
  return fetchPosts(true)
})

const errorType = (d: Date) => {
  if (d.getFullYear() + 1 < new Date().getFullYear()) {
    if (d.getFullYear() + 3 < new Date().getFullYear()) return 'error'
    return 'warning'
  }
  return 'normal'
}
</script>
