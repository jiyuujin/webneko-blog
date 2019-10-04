<template>
  <div class="sub-top">
    <h2 class="title">
      あわせてよみたい..
    </h2>
    -----
    <div
      v-for="post in latestPosts"
      :key="post.fields.title"
      class="sub-card"
    >
      <nuxt-link
        :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}"
      >
        <div class="title">
          {{ post.fields.title }}
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class LatestList extends Vue {
  isCenter: boolean = true;
  isBold: boolean = true;

  get latestPosts() {
    return this.$store.state.product.latestPosts
  }
}
</script>

<style scoped>
.sub-top {
  width: 100%;
  text-align: left;
}

.sub-card {
  overflow: hidden;
  height: 40px;
}

.title {
  font-size: 3vmin;
}
</style>
