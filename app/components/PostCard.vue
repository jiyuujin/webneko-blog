<template>
  <nuxt-link
    :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
    :title="`${post.fields.slug}の記事を見る`"
    class="feed-card"
  >
    <span class="reaction-img">
      {{ post.fields.reaction }}
    </span>
    <div class="feed-card__item">
      <div class="feed-card__item-title">
        {{ post.fields.title }}
      </div>
      <div class="feed-card__item-date">
        {{ new Date(post.fields.publishDate).toLocaleDateString() }}
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
import { computed } from '@nuxtjs/composition-api'

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
    const filterTags = computed(() => {
      return props.post.fields.category === 'Scrap'
        ? ['Scrap'].concat(props.post.fields.tags!)
        : props.post.fields.tags
    })
    return { filterTags }
  }
}
</script>
