<template>
  <div class="article">
    <div class="post-detail" v-html="$md.render($sanitize(body))" />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, onMounted } from '@vue/composition-api'

type LoadedMarkdownProps = {
  //
}

export default defineComponent({
  props: {
    body: {
      type: String,
      default: ''
    }
  },
  setup(props: LoadedMarkdownProps, ctx: SetupContext) {
    onMounted(() => {
      // ctx.root.$microlinkjs('.link-preview')
    })
  }
})
</script>
