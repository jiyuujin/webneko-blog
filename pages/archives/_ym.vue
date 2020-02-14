<template>
  <main-template>
    <div class="main">
      <calendar
        :items="archives"
        :ym="$route.params.ym"
      />
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

import { fetchPost } from '~/repositories/blog'

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
    head() {
        const d = dayjs(`${this.$route.params.ym}-01`)
        const year = d.format('YYYY')
        const month = d.format('MM')
        return {
            title : `${year}年 ${month}月 アーカイヴ`,
            meta: [
                { hid: 'description', name: 'description', content: `${year}年 ${month}月の投稿一覧を表示します` },
                { hid: 'twitter:title', name: 'twitter:title', content: `${year}年 ${month}月 アーカイヴ` },
                { hid: 'twitter:description', name: 'twitter:description', content: `${year}年 ${month}月の投稿一覧を表示します` },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:image', name: 'twitter:image', content: '' },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: `${year}年 ${month}月 アーカイヴ` },
                { hid: 'og:description', name: 'og:description', content: `${year}年 ${month}月の投稿一覧を表示します` },
                { hid: 'og:url', name: 'og:url', content: `/archives/${this.$route.params.ym}` },
                { hid: 'og:image', name: 'og:image', content: '' }
            ]
        }
    }
})
</script>
