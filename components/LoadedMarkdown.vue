<template>
  <div v-if="body">
    <div
      class="post-detail"
      v-html="$md.render(body)"
    />
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
        (this as any).$microlinkjs('.link-preview')
    }
})
</script>
