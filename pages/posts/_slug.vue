<template>
  <main-template v-if="currentPost">
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
      <div class="blog-card">
        <div
          class="body"
          v-html="$md.render(currentPost.fields.body)"
        />

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
      </div>

      <div class="profile-card">
        <card
          background-color="#fff"
          color="#000"
          fontSize="12px"
          style="margin-bottom: 36px;"
        />
        <a
          href="../profile"
          target="_blank"
          rel="noopener"
        >
          This's Profile
        </a>
        <latest-list />
        <div>
          <google-adsense
            slot="8547878202"
            ad-format="auto"
            :ad-style="{ display: 'block' }"
          />
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const MainTemplate = () => import('~/components/layouts/MainTemplate.vue')
const SocialMenu = () => import('~/components/layouts/SocialMenu.vue')
const Card = () => import('~/components/profile/Card.vue')
const LatestList = () => import('~/components/post/LatestList.vue')
const New = () => import('~/components/contact/New.vue')
const GoogleAdsense = () => import('~/components/layouts/GoogleAdsense.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/initPosts', {
      'slug': params.slug
    })
  },
  components: {
    MainTemplate,
    SocialMenu,
    Card,
    LatestList,
    New,
    GoogleAdsense
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
  },
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
  overflow: hidden;
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
  width: 84%;
  margin: 2% 8% 2% 8%;
  text-align: center;
  overflow: hidden;
}

.article p {
  text-align: left;
  font-size: 16px;
  color: #35495e;
  padding-right: 16px;
}

.blog-card {
  float: left;
  width : -webkit-calc(100% - 300px - 24px) ;
  width : calc(100% - 300px - 24px);
}

.profile-card {
  float: right;
  width: 300px;
  margin-left: 24px;
}

.profile-card a {
  text-decoration: none;
  margin: 0 1em;
  padding-right: 16px;
  background: url(../../static/external_link.png) no-repeat right center;
}

@media (max-width: 500px) {
  .blog-card {
    width: 100%;
  }

  .profile-card {
    display: none;
  }
}
</style>
