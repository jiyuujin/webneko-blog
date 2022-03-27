<template>
  <main>
    <div class="section">
      <div class="feeds">
        <post-card v-for="post in posts.items" :key="post.fields.title" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { fetchPosts } from '~/api/blog'
import { generalOg, twitterOg } from '~/utils/og.constants'

import PostCard from '~/components/PostCard.vue'

const { data: posts } = await useAsyncData('posts', () => {
  return fetchPosts()
})

useMeta({
  title: 'Web猫ブログ',
  meta: [
    ...generalOg(),
    ...twitterOg()
  ]
})
</script>
