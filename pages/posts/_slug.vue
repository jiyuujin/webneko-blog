<template>
  <main-template v-if="currentPost">
    <header-text />

    <div :class="currentPost.fields.heroImage ? 'cover' : 'space'">
      <template v-if="currentPost.fields.heroImage">
        <img
          :src="currentPost.fields.heroImage.fields.file.url"
          :alt="currentPost.fields.title"
          decoding="async"
        >
      </template>

      <div class="title">
        {{ currentPost.fields.title }}
      </div>

      <div class="date">
        {{ getDate(currentPost.fields.publishDate) }}
      </div>
    </div>

    <div class="article">
      <loaded-markdown
        :body="currentPost.fields.body"
      />

      <google-adsense
        slot="5228106955"
        ad-format="fluid"
        ad-layout="in-article"
        :ad-style="{ display: 'block', 'text-align': 'center' }"
      />

      <social-menu
        :slug-text="currentPost.fields.slug"
        :title="currentPost.fields.title"
        :is-vertical="!isVertical"
      />

      <div class="buy-me-a-coffee">
        <buy-me-a-coffee />
      </div>

      <div>
        <p>
          コメントを残す
        </p>
        <new-contact
          :blog-title="currentPost.fields.title"
        />
      </div>

      <div class="late-article">
        <h2 class="title">
          あわせてよみたい..
        </h2>
        -----
        <div
          v-for="post in latestPosts"
          :key="post.fields.title"
          class="item"
        >
          <nuxt-link
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}"
          >
            <div class="item-title">
              {{ post.fields.title }}
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const SocialMenu = () => import('~/components/SocialMenu.vue')
const NewContact = () => import('~/components/NewContact.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const LoadedMarkdown = () => import('~/components/LoadedMarkdown.vue')
const BuyMeACoffee = () => import('~/components/BuyMeACoffee.vue')

export default Vue.extend({
    components: {
        MainTemplate,
        HeaderText,
        SocialMenu,
        NewContact,
        GoogleAdsense,
        LoadedMarkdown,
        BuyMeACoffee
    },
    async asyncData({ store, params }) {
        await store.dispatch('product/fetchPost', {
            'slug': params.slug,
            'month': ''
        })
    },
    data() {
        return {
            isVertical: true
        }
    },
    computed: {
        currentPost() {
            return this.$store.state.product.currentPost
        },
        latestPosts() {
            return this.$store.state.product.latestPosts
        }
    },
    methods: {
        getDate(date: Date) {
            return dayjs(date).format('MM月 DD日')
        }
    },
    head() {
        let heroImage = ''
        if ((this as any).currentPost.fields.heroImage) {
            heroImage = `https:${(this as any).currentPost.fields.heroImage.fields.file.url}`
        }
        return {
            title : (this as any).currentPost.fields.title || '',
            meta: [
                { hid: 'description', name: 'description', content:(this as any).currentPost.fields.description || '' },
                { hid: 'og:type', property: 'og:type', content: 'article' },
                { hid: 'og:title', property: 'og:title', content: (this as any).currentPost.fields.title || '' },
                { hid: 'og:description', property: 'og:description', content: (this as any).currentPost.fields.description || '' },
                { hid: 'og:url', property: 'og:url', content: `./${(this as any).currentPost.fields.slug}` || '' },
                { hid: 'og:image', property: 'og:image', content: heroImage || '' }
            ]
        }
    }
})
</script>

<style scoped>
.cover {
  position: relative;
}

.cover .title {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - 25px);
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 1.8vmax;
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
  font-size: 1.2vmax;
  line-height: 24px;
}

.cover img {
  width: 100%;
  height: 50vh;
  object-fit: cover;
  vertical-align: middle;
  background-position: center;
  background-size: cover;
  filter: brightness(60%);
}

.space {
  position: relative;
  width: 100%;
  height: 50vh;
  vertical-align: middle;
}

.space .title {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - 25px);
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 1.8vmax;
  line-height: 48px;
}

.space .date {
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(75% + 25px);
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 1.2vmax;
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
  text-align: left;
}

.late-article .title {
  font-size: 1.2vmax;
}

.late-article .item {
  overflow: hidden;
  height: 40px;
}

.late-article .item-title {
  font-size: 1.8vmax;
}

@media (max-width: 500px) {
  .article {
    width: 98%;
    margin: 2% 1% 2% 1%;
    text-align: center;
    overflow: hidden;
  }
}
</style>
