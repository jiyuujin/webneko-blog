<template>
  <div class="main">
    <div class="calendar-header">
      <h1>俺だけアドベントカレンダー</h1>
      <p>{{ `${year}/12` }}</p>
    </div>

    <div class="calendar">
      <span
        v-for="weekday in weekdays"
        :key="weekday"
        class="weekday"
      >
        {{ weekday }}
      </span>
      <div
        v-for="i in startOfMonth"
        :key="i"
        class="day day--disabled"
      />
      <div
        v-for="day in 31"
        :key="day"
        class="day"
      >
        <div class="date">
          {{ day }}
        </div>
        <div v-if="getPost(day)">
          <template v-if="day < 26">
            <a
              :href="`https://webneko.dev/posts/${getPost(day).fields.slug}`"
              target="_blank"
              rel="noopener"
            >
              <img
                :alt="getPost(day).fields.slug"
                src="/bakeneko2.png"
                class="day--existed"
              />
              <!--
              <span class="tooltip">
                {{ getPost(day).fields.title }}
              </span>
              -->
            </a>
          </template>
        </div>
        <div v-else>
          <template v-if="day < 26">
            <img
              :alt="getPost(day) ? getPost(day).fields.slug : ''"
              src="/bakeneko2.png"
              class="day--not-existed"
            />
          </template>
        </div>
      </div>
      <div
        v-for="i in endOfMonth"
        :key="i"
        class="day day--disabled"
      />
    </div>
  </div></template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import dayjs from 'dayjs'
import { PostItem } from '~/types/blog'

const weekdays = ['日', '月', '火', '水', '木', '金', '土']

export default Vue.extend({
    props: {
        items: {
            type: Array as PropType<PostItem[]>,
            default: function() {
                return []
            }
        },
        year: {
            type: String as PropType<string>,
            default: '2019'
        }
    },
    data() {
        return {
            weekdays: weekdays
        }
    },
    computed: {
        startOfMonth() {
            const startDay = dayjs(`${this.year}/12/01`).format('dddd')
            if (startDay === 'Sunday') {
                return 0
            } else if (startDay === 'Monday') {
                return 1
            } else if (startDay === 'Tuesday') {
                return 2
            } else if (startDay === 'Wednesday') {
                return 3
            } else if (startDay === 'Thursday') {
                return 4
            } else if (startDay === 'Friday') {
                return 5
            } else if (startDay === 'Saturday') {
                return 6
            }
            return null
        },
        endOfMonth() {
            const endDay = dayjs(`${this.year}/12/31`).format('dddd')
            if (endDay === 'Sunday') {
                return 6
            } else if (endDay === 'Monday') {
                return 5
            } else if (endDay === 'Tuesday') {
                return 4
            } else if (endDay === 'Wednesday') {
                return 3
            } else if (endDay === 'Thursday') {
                return 2
            } else if (endDay === 'Friday') {
                return 1
            } else if (endDay === 'Saturday') {
                return 7
            }
            return null
        }
    },
    methods: {
        getPost(day: number) {
            let post: PostItem | null | undefined
            (this.items as PostItem[]).map((item: PostItem) => {
                if (day === Number(dayjs(item.fields.publishDate).format('DD'))) {
                    post = item
                }
            })
            return post
        }
    }
})
</script>

<style lang="scss" scoped>
  .calendar-header {
    position: relative;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    vertical-align: middle;
    background-color: #56c501;

    h1 {
      margin: 0;
      font-size: 18px;
      color: #e2e2e2;
    }

    p {
      margin: 0;
      font-size: 13px;
      font-weight: 600;
      color: #51565d;
    }
  }

  .calendar {
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: repeat(7, minmax(20px, 1fr));
    grid-auto-rows: 120px;
    width: 100%;
    overflow: auto;
  }

  .weekday {
    font-size: 12px;
    font-weight: 500;
    line-height: 50px;
    color: #99a1a7;
    text-align: center;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  }

  .day {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 14px 20px;
    font-size: 14px;
    color: #98a0a6;
    text-align: center;
    letter-spacing: 1px;
    vertical-align: middle;
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);

    .date {
      width: 100%;
    }

    img {
      width: 40px;
      border-radius: 40px;
    }
  }

  .day--existed {
    opacity: 1;
  }

  .day--not-existed {
    opacity: 0.4;
  }

  .day--disabled {
    color: rgba(152, 160, 166, 0.6);
    cursor: not-allowed;
    background-color: #fff;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f9f9fa' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
  }

  @media (max-width: 500px) {
    .calendar {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }

    .weekday {
      display: none;
    }

    .day {
      width: 100%;
    }

    .day--disabled {
      display: none;
    }
  }
</style>
