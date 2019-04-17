<template>
  <div>
    <div
      v-if="post"
      class="post"
    >
      <img
        :src="post.fields.heroImage.fields.file.url"
        :alt="post.fields.title"
      >
      <h2>
        {{ post.fields.title }}
      </h2>
      <p>
        {{ (new Date(post.fields.publishDate)).toDateString() }}
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

@Component({})
export default class Detail extends Vue {
  @Prop() post: object;
}
</script>

<style scoped>
.post img {
  width: 25%;
}
</style>
