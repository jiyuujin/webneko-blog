<template>
  <div class="top">
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      Articles
    </title-label>
    <div
      v-for="post in posts"
      :key="post.fields.title"
      class="card"
    >
      <nuxt-link
        :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}"
      >
        <div class="hero-image">
          <img
            :src="post.fields.heroImage.fields.file.url"
            :alt="post.fields.title"
          >
        </div>
        <h2>
          {{ post.fields.title }}
        </h2>
        <h3>
          <p>
            {{ post.fields.description }}
          </p>
        </h3>
        <p>
          {{ (new Date(post.fields.publishDate)).toDateString() }}
        </p>
      </nuxt-link>
      <hr>
    </div>
    <Pagination
      :page="page"
      :max="pagesTotal"
      @page-data="applyPage"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')
const Pagination = () => import('~/components/atoms/Pagination.vue')

@Component({
  components: {
    TitleLabel,
    Pagination
  },
  // computed: {
  //   ...mapState({
  //     'posts': (state: any) => state.product.posts,
  //     'page': (state: any) => state.product.page,
  //     'pagesTotal': (state: any) => state.product.pagesTotal
  //   })
  // }
})
export default class Top extends Vue {
  async applyPage(value: number) {
    await this.$store.commit('product/setPage', value)
    await this.$store.dispatch('product/initPosts', {
      'slug': ''
    })
  }

  get posts() {
    return this.$store.state.product.posts
  }

  get page() {
    return this.$store.state.product.page
  }

  get pagesTotal() {
    return this.$store.state.product.pagesTotal
  }

  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.top {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: calc(33.3% - 24px);
  margin: 8px;
}

.card h2 {
  font-size: 18px;
  height: 2.4em;
  line-height: 1.2;
}

.card h3 {
  font-size: 14px;
}

.card h3 p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card p {
  text-align: right;
}

.card hr {
  color: #808080;
}

.hero-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.hero-image img:hover {
  transform: scale(1.1);
  transition-duration: 0.3s;
}

@media (max-width: 500px) {
  .card {
    width: calc(100% - 10px);
    margin: 5px;
  }
}
</style>
