<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render($sanitize(body))" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    body: {
      type: String as PropType<string>,
      default: ''
    }
  },
  async mounted() {
    /* eslint-dsiable */
    // @ts-ignore
    this.$microlinkjs('.link-preview')
  }
})
</script>
