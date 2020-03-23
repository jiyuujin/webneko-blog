<template>
  <div class="header">
    <img src="/icon/bakeneko2.png" alt="icon" />
    <div class="author">
      <h1>
        Web猫ブログ <span>v{{ blogVersion }}</span>
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

export default Vue.extend({
  computed: {
    blogVersion() {
      return require('../package.json').version
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin: 18px 0 24px 0;

  img {
    width: 16%;
    min-width: 40px;
    max-width: 80px;
    height: 80px;
    margin: 0 12px;
    border-radius: 500rem;
  }

  .author {
    margin-left: 12px;

    h1 {
      display: block;
      margin: 0 0 10px 0;
      font-size: 1.2em;
      font-weight: bold;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0;
      margin-inline-end: 0;

      span {
        color: #98a0a6;
        font-size: 0.8em;
      }
    }
  }
}

@media (max-width: 600px) {
  .header {
    img {
      width: 12%;
      min-width: 60px;
      max-width: 60px;
      height: 60px;
    }

    .author {
      h1 {
        font-size: 1rem;
      }
    }
  }
}
</style>
