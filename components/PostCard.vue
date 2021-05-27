<template>
  <nuxt-link
    :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
    class="feed-card"
  >
    <template v-if="post.fields.reaction">
      <span class="reaction-img">
        {{ post.fields.reaction }}
      </span>
    </template>
    <template v-else>
      <img
        v-if="mode === 'light'"
        src="/icon/mikaeri-white.svg"
        alt="archive"
        decoding="async"
      />
      <img
        v-if="mode === 'dark'"
        src="/icon/mikaeri-black.svg"
        alt="archive"
        decoding="async"
        :style="{ backgroundColor: '#fff' }"
      />
    </template>
    <div class="feed-card__item">
      <div class="feed-card__item-title">
        {{ post.fields.title }}
      </div>
      <div class="feed-card__item-date">
        {{ new Date(post.fields.publishDate).toLocaleDateString() }}
      </div>
      <div class="feed-card__item-tags">
        <div v-for="tag in post.fields.tags" :key="tag" class="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { useLayout } from '~/composables/layout'

export default {
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const { mode } = useLayout()
    return { mode }
  }
}
</script>
