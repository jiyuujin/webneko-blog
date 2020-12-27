<template>
  <div>
    <div class="calendar-header">
      <h1>ARCHIVES</h1>
      <p>{{ ym }}</p>
    </div>

    <div class="calendar">
      <span v-for="weekday in weekdays" :key="weekday" class="weekday">
        {{ weekday }}
      </span>
      <div v-for="i in startOfMonth" :key="i" class="day day--disabled" />
      <div v-for="day in Number(days)" :key="day" class="day">
        <div v-if="getPost(day)" class="tooltip">
          <a
            :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
            target="_blank"
            rel="noopener"
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
            target="_blank"
            rel="noopener"
          >
            <img
              :alt="getPost(day).fields.slug"
              src="/icon/bakeneko2.png"
              class="day--existed"
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
            class="day--not-existed"
          />
        </div>
      </div>
      <div v-for="i in endOfMonth" :key="i" class="day day--disabled" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import useCalendar from '@/composables/calendar'

const WEEKDAY_LIST = ['日', '月', '火', '水', '木', '金', '土']

export default defineComponent({
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
})
</script>

<style lang="scss" scoped>
@import '@/assets/calendar';
</style>
