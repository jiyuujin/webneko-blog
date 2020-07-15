<template>
  <main-template>
    <div class="main">
      <div class="tag-text">
        <div class="tag">
          {{ $route.params.name }}
        </div>
      </div>

      <div class="top">
        <template v-for="post in posts">
          <nuxt-link
            :key="post.fields.title"
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
          >
            <post-item :post="post" />
          </nuxt-link>
        </template>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { fetchPostsByTag } from '~/repositories/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const PostItem = () => import('~/components/PostItem.vue')

export default defineComponent({
  components: {
    MainTemplate,
    PostItem
  },
  async asyncData({ route }) {
    return {
      posts: await fetchPostsByTag(route.params.name)
    }
  }
})
</script>
