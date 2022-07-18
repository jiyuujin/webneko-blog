<template>
  <main>
    <div class="section">
      <div class="feeds">
        <post-card v-for="(post, index) in posts" :key="index" :post="post" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchPosts } from '~/hooks/useBlogData'
import { generalOg, twitterOg } from '~/utils/og.constants'

import PostCard from '~/components/PostCard.vue'

const posts = await useFetchPosts()

useHead({
  title: 'Web猫ブログ',
  meta: [
    ...generalOg(),
    ...twitterOg()
  ]
})
</script>
