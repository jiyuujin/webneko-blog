<template>
  <div class="career">
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      経歴
    </title-label>
    <title-label
      :is-center="isCenter"
      width="92%"
      horizontal-margin="4%"
    >
      <div
        v-for="item in data"
        :key="item.id"
      >
        <span class="nav__left">
          {{ item.company }}
        </span>
        <span class="nav__right">
          {{ getDateFormat(item.startAt) }} - <template v-if="item.endAt">{{ getDateFormat(item.endAt) }}</template>
        </span>
      </div>
    </title-label>
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
  endAt: Date
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
.nav__left {
  float: left;
  margin-left: 25%;
}
.nav__right {
  text-align: right;
}
</style>
