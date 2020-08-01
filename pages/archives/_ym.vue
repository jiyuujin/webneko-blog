<template>
  <main-template>
    <div class="main">
      <calendar :items="archives" :ym="$route.params.ym" />
      <google-adsense
        slot="5919567639"
        ad-format="auto"
        :ad-style="{ display: 'block' }"
      />
    </div>
  </main-template>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api'

import { fetchPost } from '~/repositories/blog'
import { isInvalidDate } from '~/services/date'

const MainTemplate = () => import('~/components/MainTemplate.vue')
const GoogleAdsense = () => import('~/components/GoogleAdsense.vue')
const Calendar = () => import('~/components/Calendar.vue')

export default defineComponent({
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
  setup(props, ctx: SetupContext) {
    onMounted(() => {
      if (isInvalidDate(ctx.root.$route.params.ym)) {
        ctx.root.$router.push('*')
      }
    })
  }
})
</script>
