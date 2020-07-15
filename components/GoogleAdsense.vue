<template>
  <div class="ad">
    <adsbygoogle
      :ad-slot="adSlot"
      :ad-format="adFormat"
      :ad-layout="adLayout"
      :ad-style="adStyle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    adSlot: {
      type: String,
      default: ''
    },
    adFormat: {
      type: String,
      default: ''
    },
    adLayout: {
      type: String,
      default: ''
    },
    adStyle: {
      type: Object,
      default: null
    }
  }
})
</script>
