<template>
  <div class="section">
    <calendar :items="archives" :ym="$route.params.ym" />
    <google-adsense
      ad-slot="5919567639"
      ad-format="auto"
      :ad-style="{ display: 'block' }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPost } from '~/api/blog'
import { generalOg, twitterOg } from '~/utils/og.constants'
import Endpoints from '~/utils/endpoints.constants'

const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const Calendar = () => import('~/components/Calendar.vue')

export default Vue.extend({
  components: {
    GoogleAdsense,
    Calendar
  },
  async asyncData({ params }) {
    return {
      ym: params.ym,
      archives: await fetchPost({
        slug: '',
        ym: params.ym
      })
    }
  },
  head() {
    return {
      title: (this as any).ym,
      meta: [
        ...generalOg(
          `${(this as any).ym} 記事一覧`,
          `${(this as any).tagName} の記事を集めました`,
          `${Endpoints.TAG_BASE_URL}${(this as any).ym}`
        ),
        ...twitterOg(
          `${(this as any).ym} 記事一覧`,
          `${(this as any).ym} の記事を集めました`
        )
      ]
    }
  },
  mounted() {
    if ((this as any).isInvalidDate(this.$route.params.ym)) {
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
