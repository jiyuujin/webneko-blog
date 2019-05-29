<template>
  <div class="top">
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
        <div class="category">
          <label-form
            :tag-text="post.fields.category ? getCategory(post.fields.category) : '未分類'"
            background-color="#42b883"
            color="#000"
          />
        </div>
        <h2>
          {{ post.fields.title }}
        </h2>
        <h3>
          <p>
            {{ post.fields.description }}
          </p>
        </h3>
        <div class="date">
          {{ getDate(post.fields.publishDate) }}
        </div>
        <div class="tags">
          <span
            v-for="tag in post.fields.tags"
            :key="tag"
          >
            <label-form
              :tag-text="tag"
            />
          </span>
        </div>
      </nuxt-link>
      <hr>
    </div>
    <div class="pager">
      <pagination
        :page="page"
        :max="pagesTotal"
        @page-data="applyPage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import dayjs from 'dayjs'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')
const Pagination = () => import('~/components/atoms/Pagination.vue')
const LabelForm = () => import('~/components/atoms/LabelForm.vue')

@Component({
  components: {
    TitleLabel,
    Pagination,
    LabelForm
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

  getCategory(category: string) {
    switch (category) {
      case 'Front':
        return 'フロントエンド'
      case 'Server':
        return 'サーバーサイド'
      default:
        return 'その他'
    }
  }

  getDate(date: Date) {
    return dayjs(date).format('MM月 DD日')
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
  position: relative;
}

.card .date {
  font-size: 14px;
  text-align: right;
}

.card .category {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 0.2em;
}

.card h2 {
  font-size: 18px;
  height: 2.4em;
  line-height: 1.2;
  text-align: center;
}

.card h3 {
  font-size: 14px;
}

.card h3 p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card .tags {
  overflow-x: auto;
  white-space: nowrap;
}

.card hr {
  color: #808080;
}

.hero-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.pager {
  margin: 0 auto;
}

@media (max-width: 500px) {
  .card {
    width: calc(100% - 10px);
    margin: 5px;
  }
}
</style>
