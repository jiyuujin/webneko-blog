<template>
  <div class="error">
    <template v-if="error.statusCode === 404">
      <nuxt-link to="/">That's \ 404 /</nuxt-link>
    </template>
    <template v-else>
      <nuxt-link to="/">Please go home.. mm</nuxt-link>
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
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
