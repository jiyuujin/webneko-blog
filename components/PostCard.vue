<template>
  <div class="blog-card">
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
    <div class="blog-card__item">
      <div class="blog-card__item-title">
        {{ post.fields.title }}
      </div>
      <div class="blog-card__item-date">
        {{ new Date(post.fields.publishDate).toLocaleDateString() }}
      </div>
    </div>
  </div>
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
