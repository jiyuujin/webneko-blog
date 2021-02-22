<template>
  <main-template>
    <div class="main">
      <calendar :items="archives" :ym="$route.params.ym" />
      <google-adsense
        ad-slot="5919567639"
        ad-format="auto"
        :ad-style="{ display: 'block' }"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPost } from '~/api/blog'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const Calendar = () => import('~/components/Calendar.vue')

export default Vue.extend({
  components: {
    MainTemplate,
    GoogleAdsense,
    Calendar
  },
  async asyncData({ params }) {
    return {
      archives: await fetchPost({
        slug: '',
        ym: params.ym
      })
    }
  },
  mounted() {
    if (this.isInvalidDate(this.$route.params.ym)) {
      this.$router.push('*')
    }
  },
  methods: {
    isInvalidDate(value: string) {
      return value.toString() === 'Invalid Date'
    }
  }
})
</script>
