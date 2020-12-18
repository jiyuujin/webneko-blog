<template>
  <div class="blog-item">
    <div class="blog-item-title">
      {{ post.fields.title }}
    </div>
    <div class="blog-item-date">
      {{ getCurrentDate(post.fields.publishDate) }}
    </div>
    <div class="blog-item-description">
      <span v-if="post.fields.category === 'Scrap'">SCRAP</span>
      {{ post.fields.description }}
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
