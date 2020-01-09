<template>
  <adsbygoogle
    :ad-slot="adSlot"
    :ad-format="adFormat"
    :ad-layout="adLayout"
    :ad-style="adStyle"
  />
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export default Vue.extend({
    props: {
        adSlot: {
            type: String as PropType<string>,
            default: ''
        },
        adFormat: {
            type: String as PropType<string>,
            default: ''
        },
        adLayout: {
            type: String as PropType<string>,
            default: ''
        },
        adStyle: {
            type: Object as PropType<object>,
            default: null
        }
    }
})
</script>
