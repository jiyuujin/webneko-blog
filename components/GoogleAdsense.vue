<template>
  <div>
    <div class="ad">
      <adsbygoogle
        :ad-slot="adSlot"
        :ad-format="adFormat"
        :ad-layout="adLayout"
        :ad-style="adStyle"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
