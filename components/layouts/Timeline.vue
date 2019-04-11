<template>
  <div>
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      経歴
    </title-label>
    <ul
      v-for="item in data"
      :key="item.id"
    >
      <li
        v-if="!item.company"
      >
        <p class="timeline-date">
          {{ getDateFormat(item.startAt) }}
        </p>
        <div class="timeline-content">
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
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')
import moment from 'moment'

interface Work {
  id: number,
  company: string,
  startAt: Date,
  endAt: Date,
  title: string,
  description: string
}

@Component({
  components: {
    TitleLabel
  }
})
export default class Career extends Vue {
  @Prop() data!: Work;
  isCenter: boolean = true;
  isBold: boolean = true;

  getDateFormat(d: Date) {
    return moment(d).format('YYYY/MM')
  }
}
</script>

<style scoped>
ul {
  list-style: none;
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

  .timeline-date {
    width: 110px;
    float: left;
    margin-top: 20px;
  }

  .timeline-content {
    width: 75%;
    float: left;
    text-align: left;
    border-left: 3px #35495e solid;
    padding-left: 30px;
    font-size: 2vmin;
  }

  .timeline-content:before {
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
