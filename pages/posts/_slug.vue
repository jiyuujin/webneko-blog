<template>
  <main-template
    v-if="currentPost"
  >
    <social-menu
      :slug-text="currentPost.fields.slug"
      :title="currentPost.fields.title"
    />
    <div class="article">
      <div class="blog-card">
        <p>
          <nuxt-link to="/">Home</nuxt-link> > {{ currentPost.fields.title }}
        </p>
        <detail
          :post="currentPost"
        />
        <!--
        <div>
          <google-adsense
            :slot="adSlot"
            :ad-format="adFormat"
            :ad-layout="adLayout"
            :ad-style="adStyle"
          />
        </div>
        -->
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
          style="margin-bottom: 36px;"
        />
        <biography
          fontSize="12px"
        />
        <a
          href="./profile"
          target="_blank"
        >
          This's Profile
        </a>
        <latest-list />
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/templates/MainTemplate.vue')
const SocialMenu = () => import('~/components/profile/SocialMenu.vue')
const Card = () => import('~/components/profile/Card.vue')
const Biography = () => import('~/components/profile/Biography.vue')
const Detail = () => import('~/components/post/Detail.vue')
const LatestList = () => import('~/components/post/LatestList.vue')
const New = () => import('~/components/contact/New.vue')
const GoogleAdsense = () => import('~/components/atoms/GoogleAdsense.vue')

@Component({
  components: {
    MainTemplate,
    SocialMenu,
    Card,
    Biography,
    Detail,
    LatestList,
    New,
    GoogleAdsense
  },
  head(this: Slug) {
    return {
      title : this.currentPost.fields.title || '',
      // title : this.title || '',
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.currentPost.fields.title || '' },
        { hid: 'og:description', property: 'og:description', content: this.currentPost.fields.description || '' },
        { hid: 'og:image', property: 'og:image', content: `https:${this.currentPost.fields.heroImage.fields.file.url}` || '' },
        { hid: 'og:title', name: 'og:title', content: this.currentPost.fields.title || '' },
        { hid: 'og:description', name: 'og:description', content: this.currentPost.fields.description || '' },
        { hid: 'og:image', name: 'og:image', content: `https:${this.currentPost.fields.heroImage.fields.file.url}` || '' },
        // { property: 'og:title', content: this.title || '' },
        // { property: 'og:description', content: this.description || '' },
        // { name: 'og:title', content: this.title || '' },
        // { name: 'og:description', content: this.description || '' },
        // { name: 'og:image', content: this.post ? `https:${this.heroImage}` : '' },
      ]
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('product/initPosts', {
      'slug': params.slug
    });
    return {
      currentPost: store.state.product.currentPost,
      // title: store.state.product.currentPost ? store.state.product.currentPost.fields.title : '',
      // description: store.state.product.currentPost ? store.state.product.currentPost.fields.description : '',
      // heroImage: store.state.product.currentPost ? store.state.product.currentPost.fields.heroImage.fields.file.url : ''
    }
  },
  scrollToTop: true
})
export default class Slug extends Vue {
  adSlot: string = '2995295864';
  adFormat: string = 'fluid';
  adLayout: string = 'in-article';
  adStyle: object = {
    display: 'block'
  };

  get currentPost() {
    return this.$store.state.product.currentPost
  }
}
</script>

<style scoped>
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
