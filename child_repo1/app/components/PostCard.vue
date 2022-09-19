<template>
  <nuxt-link :to="`/posts/${postInfo?.slug}`" class="feed-card">
    <span class="reaction-img">
      {{ postInfo?.reaction }}
    </span>
    <div class="feed-card__item">
      <div class="feed-card__item-title">
        {{ postInfo?.title }}
      </div>
      <div class="feed-card__item-date">
        <div v-if="USE_CONTENT">
          {{ new Date(postInfo?.date).toLocaleDateString() }}
        </div>
        <div v-if="USE_CONTENTFUL">
          {{ new Date(postInfo?.publishDate).toLocaleDateString() }}
        </div>
      </div>
      <div class="feed-card__item-tags">
        <div
          v-for="tag in filterTags"
          :key="tag"
          :class="tag === 'Scrap' && 'scrap-tag'"
          class="tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { USE_CONTENT, USE_CONTENTFUL } from '~/utils/feature.constants'

export default {
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup(props) {
    const postInfo = computed(() => {
      if (USE_CONTENT && !USE_CONTENTFUL) return props.post
      return props.post.fields
    })
    const filterTags = computed(() => {
      return postInfo.category === 'Scrap'
        ? ['Scrap'].concat(postInfo.tags!)
        : postInfo.tags
    })
    return { postInfo, filterTags, USE_CONTENT, USE_CONTENTFUL }
  }
}
</script>
