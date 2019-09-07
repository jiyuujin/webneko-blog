<template>
  <div>
    <ul v-for="item in list" :key="item.id">
      <li>
        <p class="work-timeline-date">
          {{ getDateFormat(item.startAt) }}
        </p>
        <div class="work-timeline-content">
          <h3>
            {{ item.title }}
          </h3>
          <p>
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  props: {
    list: {
      type: Array
    }
  },
  methods: {
    getDateFormat(d) {
      return dayjs(d).format('YYYY/MM')
    }
  }
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

ul > li {
  margin-bottom: 60px;
}

@media (min-width : 640px) {
  ul > li {
    overflow: hidden;
    margin: 0;
    position: relative;
  }

  .work-timeline-date {
    width: 110px;
    float: left;
    margin-top: 20px;
  }

  .work-timeline-content {
    width: 75%;
    float: left;
    text-align: left;
    border-left: 3px #35495e solid;
    padding-left: 30px;
    font-size: 2vmin;
  }

  .work-timeline-content:before {
    content: '';
    width: 12px;
    height: 12px;
    background: #42b883;
    position: absolute;
    left: 106px;
    top: 24px;
    border-radius: 100%;
  }
}
</style>
