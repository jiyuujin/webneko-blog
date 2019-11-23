<template>
  <advent-calendar
    :items="adventCalendars"
    :year="$route.params.year"
  />
</template>

<script>
import Vue from 'vue'
import AdventCalendar from '@/components/AdventCalendar.vue'

export default Vue.extend({
    components: {
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
            title : '(わたし的)アドベントカレンダー',
            meta: [
                { hid: 'description', name: 'description', content: 'クリスマスまでの日数をカウントダウンするアドベントカレンダーの習慣に基づいて投稿するイベントです。' },
                { hid: 'og:type', property: 'og:type', content: 'article' },
                { hid: 'og:title', property: 'og:title', content: '(わたし的)アドベントカレンダー' },
                { hid: 'og:description', property: 'og:description', content: 'クリスマスまでの日数をカウントダウンするアドベントカレンダーの習慣に基づいて投稿するイベントです。' },
                { hid: 'og:url', property: 'og:url', content: '' },
                { hid: 'og:image', property: 'og:image', content: '' }
            ]
        }
    }
})
</script>
