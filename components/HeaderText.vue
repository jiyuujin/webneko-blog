<template>
  <div class="header">
    <span v-if="archivesSize === 0">Web猫ブログ</span>
    <span v-if="isMonthMatched">{{ getMonth }} - {{ archivesSize }} 件</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
    props: {
        archivesSize: {
            type: Number,
            default: 0
        }
    },
    computed: {
        getMonth(): string {
            return dayjs(this.$route.params.month).format('YYYY年 MM月')
        },
        isMonthMatched(): boolean {
            return this.$route.path === `/archives/${dayjs(this.$route.params.month).format('YYYY-MM')}`
        }
    }
})
</script>

<style scoped>
.header {
  position: fixed;
  width: 100%;
  padding: 12px;
  top: 0;
  left: 8%;
  line-height: 1.2;
  font-size: 3vmin;
  z-index:24;
}
</style>
