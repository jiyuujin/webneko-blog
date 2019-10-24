<template>
  <main-template>
    <header-text />

    <div class="main">
      <div class="top">
        <div
          v-for="(post, index) in posts"
          :key="post.fields.title"
          :style="index < count ? 'margin: 12px 4%;' : ''"
          class="card"
        >
          <template v-if="index < count">
            <nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
              <div class="title">
                {{ post.fields.title }}
              </div>
              <div class="date">
                {{ getDate(post.fields.publishDate) }}
              </div>
              <div class="description">
                {{ post.fields.description }}
              </div>
            </nuxt-link>
          </template>
        </div>
      </div>

      <google-adsense
        slot="5919567639"
        ad-format="auto"
        :ad-style="{ display: 'block' }"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
import { PAGE } from '~/services/blog';
const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

@Component({
    async asyncData ({ store }) {
        await store.dispatch('product/fetchAllPosts')
    },
    components: {
        MainTemplate,
        HeaderText,
        GoogleAdsense
    }
})
export default class Index extends Vue {
    get posts() {
        return this.$store.state.product.posts
    }

    getDate(date: Date) {
        return dayjs(date).format('MM月 DD日')
    }

  count: number = PAGE;
}
</script>

<style scoped>
.main {
  margin: 24px 10% 8px;
  padding-top: 36px;
}

.top {
  width: 52%;
  margin: 2% 24% 2% 24%;
  padding-top: 36px;
  display: flex;
  flex-wrap: wrap;
}

.card {
  position: relative;
  width: 100%;
}

.title {
  font-size: 2.4vmax;
  line-height: 1.2;
  text-align: left;
}

.description {
  font-size: 1.2vmax;
  line-height: 1.2;
  height: 4.8em;
  text-align: left;
  color: #ccc;
  display: flex;
  align-items: center;
}

.date {
  font-size: 1.2vmin;
  text-align: left;
}

.hero-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

@media (max-width: 500px) {
  .main {
    margin: 0;
  }

  .top {
    width: 98%;
    margin: 0 auto;
    padding-top: 16px;
  }
}
</style>
