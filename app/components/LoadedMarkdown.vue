<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render(body)" />
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
    console.log(`${useStringWidth(props.body)} characters`)
    return {}
  }
}
</script>
