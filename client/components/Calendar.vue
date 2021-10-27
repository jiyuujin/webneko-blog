<template>
  <div>
    <div class="calendar-header">
      <nuxt-link
        :to="`/archive/${formatPreviousDate('YYYY-MM')}`"
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
      <div v-for="i in startOfMonth" :key="i" class="day day-disabled" />
      <div
        v-for="day in parseInt(formatCurrentDate('DD'))"
        :key="day"
        class="day"
      >
        <div v-if="getPost(day)" class="tooltip">
          <a
            :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
            role="button"
            aria-pressed="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ getPost(day).fields.title }}
          </a>
        </div>
        <div class="date">
          {{ day }}
        </div>
        <div v-if="getPost(day)">
          <a
            :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
            role="button"
            aria-pressed="true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              :alt="getPost(day).fields.slug"
              src="/icon/bakeneko2.png"
              class="day-existed"
            />
            <!--
            <span class="tooltip">
              {{ getPost(day).fields.title }}
            </span>
            -->
          </a>
        </div>
        <div v-else>
          <img
            :alt="getPost(day) ? getPost(day).fields.slug : ''"
            src="/icon/bakeneko2.png"
            class="day-not-existed"
          />
        </div>
      </div>
      <div v-for="i in endOfMonth" :key="i" class="day day-disabled" />
    </div>
  </div>
</template>

<script lang="ts">
import useCalendar from '~/hooks/useCalendar'

const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

export default {
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
