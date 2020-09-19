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
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  props: {
    post: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    getCurrentDate(date: Date) {
      return dayjs(date).format('MM月 DD日')
    }
  }
})
</script>
