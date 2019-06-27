<template>
  <div class="sub-top">
    <title-text
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      最新記事一覧
    </title-text>
    <div
      v-for="post in latestPosts"
      :key="post.fields.title"
      class="sub-card"
    >
      <nuxt-link
        :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}"
      >
        <div class="hero-image">
          <img
            :src="post.fields.heroImage.fields.file.url"
            :alt="post.fields.title"
            decoding="async"
          >
        </div>
        <div class="detail">
          <div class="title">
            {{ post.fields.title }}
          </div>
          <div class="date">
            {{ getDate(post.fields.publishDate) }}
          </div>
        </div>
      </nuxt-link>
      <hr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const TitleText = () => import('~/components/atoms/TitleText.vue')

@Component({
  components: {
    TitleText
  }
})
export default class LatestList extends Vue {
  isCenter: boolean = true;
  isBold: boolean = true;

  get latestPosts() {
    return this.$store.state.product.latestPosts
  }

  getDate(date: Date) {
    return `${dayjs().diff(dayjs(date), 'day')}日前`
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
  height: 80px;
}

.detail {
  overflow: hidden;
}

.detail .title {
  font-size: 2vmin;
  height: 40px;
}

.detail .date {
  font-size: 1.2vmin;
  height: 20px;
}

.sub-card hr {
  color: #808080;
}

.hero-image {
  float: left;
  margin-right: 12px;
}

.hero-image img {
  width: 60px;
}
</style>
