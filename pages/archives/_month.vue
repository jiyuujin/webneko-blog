<template>
  <main-template>
    <header-text />

    <div class="main">
      <div class="archive">
        <div
          v-for="post in archives"
          :key="post.fields.title"
          class="card"
        >
          <nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
            <div class="title">
              {{ post.fields.title }}
            </div>
          </nuxt-link>
          <div class="date">
            {{ getDate(post.fields.publishDate) }}
          </div>
          <div class="description">
            {{ post.fields.description }}
          </div>
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
import Vue from 'vue'
import dayjs from 'dayjs'
const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

export default Vue.extend({
    components: {
        MainTemplate,
        HeaderText,
        GoogleAdsense
    },
    async asyncData ({ store, route }) {
        await store.dispatch('product/fetchPost', {
            'slug': '',
            'month': route.params.month
        })
    },
    computed: {
        archives() {
            return this.$store.state.product.archives
        }
    },
    methods: {
        getDate(date: Date) {
            return dayjs(date).format('MM月 DD日')
        }
    },
    head() {
        return {
            title : `${this.$route.params.month}月 アーカイヴ`,
            meta: [
                { hid: 'description', name: 'description', content: `${this.$route.params.month}月の投稿一覧を表示します` },
                { hid: 'twitter:title', name: 'twitter:title', content: `${this.$route.params.month}月 アーカイヴ` },
                { hid: 'twitter:description', name: 'twitter:description', content: `${this.$route.params.month}月の投稿一覧を表示します` },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:image', name: 'twitter:image', content: '' },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: `${this.$route.params.month}月 アーカイヴ` },
                { hid: 'og:description', name: 'og:description', content: `${this.$route.params.month}月の投稿一覧を表示します` },
                { hid: 'og:url', name: 'og:url', content: `/archives/${this.$route.params.month}` },
                { hid: 'og:image', name: 'og:image', content: '' }
            ]
        }
    }
})
</script>

<style scoped>
.main {
  margin: 24px 10% 8px;
  padding-top: 36px;
}

.archive {
  width: 52%;
  margin: 2% 24% 2% 24%;
  padding-top: 36px;
  display: flex;
  flex-wrap: wrap;
}

.card {
  position: relative;
  width: 100%;
  margin: 12px 4%;
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

  .archive {
    width: 98%;
    margin: 0 auto;
    padding-top: 16px;
  }
}
</style>
