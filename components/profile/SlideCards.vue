<template>
  <div>
    <title-text
      :is-center="!isCenter"
      :is-bold="isBold"
      width="80%"
    >
      登壇一覧
    </title-text>
    <div class="slides">
      <div
        v-for="slide in list"
        :key="slide.id"
        class="slide-card"
      >
        <div class="slide-card-content">
          <div class="title">
            {{ slide.title }}
          </div>
          <div class="description">
            {{ getDateFormat(slide.time) }} {{ slide.event }} で登壇させていただいております。
          </div>
        </div>
        <div class="slide-card-link">
          <a
            :href="slide.url"
            rel="noopener"
            target="_blank"
          >
            Go to Slide!
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/ja'

const TitleText = () => import('~/components/atoms/TitleText.vue')

dayjs.locale('ja')

export default Vue.extend({
  components: {
    TitleText
  },
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      isCenter: true,
      isBold: true
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
.slides {
  display: flex;
  flex-wrap: wrap;
}

.slide-card {
  margin: 30px auto;
  width: 240px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}

.slide-card-content {
  padding: 20px;
}

.slide-card-content .title {
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
  overflow: hidden;
  height: 5.4em;
  line-height: 1.8;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  vertical-align: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.slide-card-content .description {
  color: #777;
  font-size: 14px;
  line-height: 1.5;
}

.slide-card-link {
  text-align: center;
  border-top: 1px solid #eee;
  padding: 20px;
}

.slide-card-link a {
  text-decoration: none;
  color: #42b883;
  margin: 0 10px;
}

.slide-card-link a:hover {
  color: #42b883;
}
</style>
