<template>
  <footer>
    <div class="footer-text">
      <div class="title">リンク</div>
      <div class="menu">
        <a href="/">トップ</a>
        <a :href="`/archives/${getCurrentMonth}`">アーカイヴ</a>
        <a href="/contact">お問い合わせ</a>
      </div>
      <div class="title">技術スタック</div>
      <div class="menu">
        <a
          href="https://ja.nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nuxt.js
        </a>
        <a
          href="https://www.contentful.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contentful
        </a>
        <a
          href="https://aws.amazon.com/jp/ecs/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS ECS
        </a>
        <a
          href="https://aws.amazon.com/jp/fargate/"
          target="_blank"
          rel="noopener noreferrer"
        >
          AWS Fargate
        </a>
      </div>
      <div class="copyright">
        Created © 2018-2020 jiyuujin LAB. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  computed: {
    getCurrentMonth() {
      return dayjs().format('YYYY-MM')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/footer';
</style>
