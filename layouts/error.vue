<template>
  <div class="error">
    <img alt="bakeneko" :src="`/icon/bakeneko.svg`" />
    <nuxt-link to="/" class="icon">
      Oooops, something is wrong \ {{ error.statusCode }} / error
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    error: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
})
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
