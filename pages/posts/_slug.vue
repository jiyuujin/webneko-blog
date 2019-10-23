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
      <div
        class="post-detail"
        v-html="$md.render(currentPost.fields.body)"
      ></div>

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

      <div>
        <p>
          コメントを残す
        </p>
        <new-contact
          :blog-title="currentPost.fields.title"
        ></new-contact>
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
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const MainTemplate = () => import('~/components/MainTemplate.vue')
const HeaderText = () => import('~/components/HeaderText.vue')
const SocialMenu = () => import('~/components/SocialMenu.vue')
const NewContact = () => import('~/components/NewContact.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')

@Component({
  async asyncData({ store, params }) {
    await store.dispatch('product/fetchPost', {
      'slug': params.slug,
      'month': ''
    })
  },
  components: {
    MainTemplate,
    HeaderText,
    SocialMenu,
    NewContact,
    GoogleAdsense
  },
  head(this: Slug) {
    let heroImage = ''
    if (this.currentPost.fields.heroImage) {
      heroImage = `https:${this.currentPost.fields.heroImage.fields.file.url}`
    }
    return {
      title : this.currentPost.fields.title || '',
      meta: [
        { hid: 'description', name: 'description', content:this.currentPost.fields.description || '' },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.currentPost.fields.title || '' },
        { hid: 'og:description', property: 'og:description', content: this.currentPost.fields.description || '' },
        { hid: 'og:url', property: 'og:url', content: `https://webneko.dev/posts/${this.currentPost.fields.slug}` || '' },
        { hid: 'og:image', property: 'og:image', content: heroImage || '' }
      ]
    }
  },
  async mounted() {
    (this as any).$microlinkjs('.link-preview')
  }
})
export default class Slug extends Vue {
  isVertical: boolean = true

  get currentPost() {
    return this.$store.state.product.currentPost
  }

  get latestPosts() {
    return this.$store.state.product.latestPosts
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
