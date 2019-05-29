<template>
  <div class="header">
    Web猫ブログ
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class HeaderText extends Vue {}
</script>

<style scoped>
.header {
  position: fixed;
  text-align: center;
  width: 100%;
  padding: 12px;
  top: 0;
  left: 0;
  background: #42b883;
  box-shadow:0 2px 8px rgba(30,30,80,.3);
  line-height: 1.2;
  font-size: 3vmin;
  z-index:24;
}
</style>
