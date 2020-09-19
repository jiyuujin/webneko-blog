<template>
  <div class="error">
    <template v-if="error.statusCode === 404">
      <nuxt-link to="/">
        That's \ 404 /
      </nuxt-link>
    </template>
    <template v-else>
      <nuxt-link to="/">
        Please go home.. mm
      </nuxt-link>
    </template>
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
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
