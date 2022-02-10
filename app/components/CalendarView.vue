<template>
  <div>
    <div class="calendar-header">
      <nuxt-link
        :to="`/archive/${formatPreviousDate('YYYY-MM')}`"
        :title="`${formatPreviousDate('YYYY-MM')}の記事を見る`"
        role="button"
        aria-pressed="true"
        :name="formatPreviousDate('YYYY-MM')"
      >
        {{ formatPreviousDate('MM') }}
      </nuxt-link>
    </div>

    <div class="calendar">
      <span v-for="weekday in weekdays" :key="weekday" class="weekday">
        {{ weekday }}
      </span>
      <div v-for="i in startOfMonth" :key="`start_${i}`" class="day day-disabled" />
      <div
        v-for="day in parseInt(formatCurrentDate('DD'))"
        :key="`day_${day}`"
        class="day"
      >
        <div v-if="getPost(day)" class="tooltip">
          <a
            :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
            :title="`${getPost(day).fields.slug}の記事を見る`"
            role="button"
            aria-pressed="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BakenekoSvg />
            {{ getPost(day).fields.title }}
          </a>
        </div>
        <div class="date">
          {{ day }}
        </div>
        <div v-if="getPost(day)">
          <a
            :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
            :title="`${getPost(day).fields.slug}の記事を見る`"
            role="button"
            aria-pressed="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BakenekoSvg />
            <!--
            <span class="tooltip">
              {{ getPost(day).fields.title }}
            </span>
            -->
          </a>
        </div>
        <div v-else>
          <BakenekoSvg :style="{ opacity: '40%' }" />
        </div>
      </div>
      <div v-for="i in endOfMonth" :key="`end_${i}`" class="day day-disabled" />
    </div>
  </div>
</template>

<script lang="ts">
import useCalendar from '~/hooks/useCalendar'

import BakenekoSvg from '~/static/icon/bakeneko.svg'

const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

export default {
  components: {
    BakenekoSvg
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    ym: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const weekdays = WEEKDAY_LIST
    return { weekdays, ...useCalendar(props) }
  }
}
</script>
