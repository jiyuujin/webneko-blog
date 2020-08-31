<template>
  <div class="blog-card">
    <div class="blog-card-title">
      {{ post.fields.title }}
    </div>
    <div class="blog-card-date">
      {{ getCurrentDate(post.fields.publishDate) }}
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
