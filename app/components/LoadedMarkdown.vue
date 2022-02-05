<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render(body)" />
    <div class="count">{{ `(${useStringWidth(body)} characters)` }}</div>
  </div>
</template>

<script lang="ts">
import { useStringWidth } from '~/hooks/useStringWidth'

export default {
  props: {
    body: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return { useStringWidth }
  }
}
</script>
