<template>
  <div class="blog-card">
    <div class="blog-card-title">
      {{ post.fields.title }}
    </div>
    <div class="blog-card-date">
      {{ getCurrentDate(post.fields.publishDate) }}
    </div>
    <div class="blog-card-description">
      {{ post.fields.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import DateComposable from '~/composables/date'

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
  setup(props: PostItemProps, ctx: SetupContext) {
    const dateModule = DateComposable({}, ctx)
    return { ...dateModule }
  }
})
</script>
