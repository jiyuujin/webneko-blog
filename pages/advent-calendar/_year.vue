<template>
  <main-template>
    <advent-calendar
      :items="adventCalendars"
      :year="$route.params.year"
    />
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'

const MainTemplate = () => import('@/components/MainTemplate.vue')
const AdventCalendar = () => import('@/components/AdventCalendar.vue')

export default Vue.extend({
    components: {
        MainTemplate,
        AdventCalendar
    },
    async asyncData({ store, route }) {
        await store.dispatch('product/fetchPost', {
            'slug': '',
            'month': `${route.params.year}-12`
        })
    },
    computed: {
        adventCalendars() {
            return this.$store.state.product.archives
        }
    },
    head() {
        return {
            title : '(俺だけ)アドベントカレンダー',
            meta: [
                { hid: 'description', name: 'description', content: 'クリスマスまでの日数をカウントダウンするアドベントカレンダーの習慣に基づいて投稿するイベントです。' },
                { hid: 'twitter:title', name: 'twitter:title', content: '(俺だけ)アドベントカレンダー' },
                { hid: 'twitter:description', name: 'twitter:description', content: 'クリスマスまでの日数をカウントダウンするアドベントカレンダーの習慣に基づいて投稿するイベントです。' },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:image', name: 'twitter:image', content: '' },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: '(俺だけ)アドベントカレンダー' },
                { hid: 'og:description', name: 'og:description', content: 'クリスマスまでの日数をカウントダウンするアドベントカレンダーの習慣に基づいて投稿するイベントです。' },
                { hid: 'og:url', name: 'og:url', content: `/advent-calendar/${this.$route.params.year}` },
                { hid: 'og:image', name: 'og:image', content: '' }
            ]
        }
    }
})
</script>
