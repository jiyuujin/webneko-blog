<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render($sanitize(body))" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    body: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // ctx.root.$microlinkjs('.link-preview')
  }
})
</script>
