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
    computed: {
        adventCalendars() {
            return this.$store.state.product.archives
        }
    },
    async asyncData({ store, route }) {
        await store.dispatch('product/fetchPost', {
            'slug': '',
            'month': `${route.params.year}-12`
        })
    }
})
</script>
