<template>
  <main>
    <h2>{{ `${$route.params.ym} Tag's Page` }}</h2>
    <p>
      {{
        `このページは jiyuujin が書いてきた ${$route.params.ym} の記事を収集したページです。`
      }}
    </p>

    <calendar-view :items="archives" :ym="$route.params.ym" />

    <google-adsense
      ad-slot="5919567639"
      ad-format="auto"
      :ad-style="{ display: 'block' }"
    />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { fetchPost } from '~/api/blog'
import { generalOg, twitterOg } from '~/utils/og.constants'
import Endpoints from '~/utils/endpoints.constants'

const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const CalendarView = () => import('~/components/CalendarView.vue')

export default Vue.extend({
  components: {
    GoogleAdsense,
    CalendarView
  },
  async asyncData({ params, $config }) {
    return {
      ym: params.ym,
      archives: await fetchPost($config, {
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
          `${Endpoints.BASE_URL}tags/${(this as any).ym}`
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
