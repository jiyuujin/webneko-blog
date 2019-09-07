<template>
  <main-template v-if="currentPost">
    <header-text />
    <div class="cover">
      <img
        :src="currentPost.fields.heroImage.fields.file.url"
        :alt="currentPost.fields.title"
        decoding="async"
      >
        <div class="title">
          {{ currentPost.fields.title }}
        </div>
        <div class="date">
          {{ getDate(currentPost.fields.publishDate) }}
        </div>
    </div>

    <div class="article">
      <detail :post="currentPost" />

      <div>
        <google-adsense
          slot="5228106955"
          ad-format="fluid"
          ad-layout="in-article"
          :ad-style="{ display: 'block', 'text-align': 'center' }"
        />
      </div>

      <social-menu
        :slug-text="currentPost.fields.slug"
        :title="currentPost.fields.title"
        :is-vertical="!isVertical"
      />

      <div>
        <p>
          コメントを残す
        </p>
        <new
          :blog-title="currentPost.fields.title"
        />
      </div>

      <div class="buy-me-a-coffee">
        <buy-me-a-coffee />
      </div>

      <div class="late-article">
        <latest-list />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const HeaderText = () => import('~/components/layouts/HeaderText.vue')
const Detail = () => import('~/components/post/Detail.vue')
const SocialMenu = () => import('~/components/layouts/SocialMenu.vue')
const LatestList = () => import('~/components/post/LatestList.vue')
const New = () => import('~/components/contact/New.vue')
const GoogleAdsense = () => import('~/components/layouts/GoogleAdsense.vue')
const BuyMeACoffee = () => import('~/components/layouts/BuyMeACoffee.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/initPosts', {
      'slug': params.slug
    })
  },
  components: {
    MainTemplate,
    HeaderText,
    Detail,
    SocialMenu,
    LatestList,
    New,
    GoogleAdsense,
    BuyMeACoffee
  },
  head(this: Slug) {
    return {
      title : this.currentPost.fields.title || '',
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.currentPost.fields.title || '' },
        { hid: 'og:description', property: 'og:description', content: this.currentPost.fields.description || '' },
        { hid: 'og:image', property: 'og:image', content: `https:${this.currentPost.fields.heroImage.fields.file.url}` || '' },
        { hid: 'og:title', name: 'og:title', content: this.currentPost.fields.title || '' },
        { hid: 'og:description', name: 'og:description', content: this.currentPost.fields.description || '' },
        { hid: 'og:image', name: 'og:image', content: `https:${this.currentPost.fields.heroImage.fields.file.url}` || '' },
      ]
    }
  }
})
export default class Slug extends Vue {
  isVertical: boolean = true

  get currentPost() {
    return this.$store.state.product.currentPost
  }

  getDate(date: Date) {
    return dayjs(date).format('MM月 DD日')
  }
}
</script>

<style scoped>
.cover {
  position: relative;
}

.cover img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  background-position: center;
  background-size: cover;
  filter: brightness(60%);
}

.cover .title {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - 25px);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 48px;
  line-height: 48px;
}

.cover .date {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(75% + 25px);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
}

.article {
  width: 52%;
  margin: 2% 24% 2% 24%;
  text-align: center;
  overflow: hidden;
}

.article p {
  text-align: left;
  font-size: 16px;
  color: #35495e;
  padding-right: 16px;
}

.buy-me-a-coffee {
  margin-left: auto;
  margin-right: auto;
  width: 800px;
  display: table-cell;
  vertical-align: middle;
  height: 120px;
}

.late-article {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 500px) {
  .cover .title {
    font-size: 24px;
    line-height: 24px;
  }

  .article {
    width: 92%;
    margin: 2% 4% 2% 4%;
    text-align: center;
    overflow: hidden;
  }
}
</style>
