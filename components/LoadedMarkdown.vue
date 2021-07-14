<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render(body)" />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    body: {
      type: String,
      default: ''
    }
  }
}
</script>
