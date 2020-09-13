<template>
  <div class="blog-item">
    <div class="blog-item-title">
      {{ post.fields.title }}
    </div>
    <div class="blog-item-date">
      {{ getCurrentDate(post.fields.publishDate) }}
    </div>
    <div class="blog-item-description">
      {{ post.fields.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import useDate from '~/composables/date'

type PostItemProps = {
  post: object
}

export default defineComponent({
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  setup(props: PostItemProps) {
    return { ...useDate() }
  }
})
</script>
