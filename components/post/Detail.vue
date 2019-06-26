<template>
  <div>
    <div
      v-if="post"
      class="post"
    >
      <img
        :src="post.fields.heroImage.fields.file.url"
        :alt="post.fields.title"
        decoding="async"
      >
      <h2>
        {{ post.fields.title }}
      </h2>
      <p>
        {{ getDate(post.fields.publishDate) }}
      </p>
      <div
        class="body"
        v-html="$md.render(post.fields.body)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import microlink from '@microlink/vanilla/umd/microlink'

@Component({
  async mounted() {
    microlink('.link-preview')
  }
})
export default class Detail extends Vue {
  @Prop() post: object;

  getDate(date: Date) {
    return dayjs(date).format('MM月 DD日')
  }
}
</script>

<style scoped>
.post img {
  width: 25%;
}
</style>
