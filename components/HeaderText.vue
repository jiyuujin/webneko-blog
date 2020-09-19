<template>
  <div class="header">
    <img src="/icon/bakeneko2.png" alt="icon" />
    <div class="author">
      <h1>
        Web猫ブログ <span>{{ blogVersion }}</span>
      </h1>
      Kyoto, Osaka / Web developer, HR adviser, etc..
      <a href="https://yuukit.me/">
        profile
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { blogVersion } from '~/services/release'

export default Vue.extend({
  data() {
    return { blogVersion }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/header';
</style>
