<template>
  <j-cookie-footer
    :title="message"
    :url="url"
    @accept="$store.dispatch('product/accept', true)"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  //
})
</script>
