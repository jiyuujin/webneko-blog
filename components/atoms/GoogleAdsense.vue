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
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class GoogleAdsense extends Vue {
  @Prop() adSlot: string;
  @Prop() adFormat: string;
  @Prop() adLayout: string;
  @Prop() adStyle: object;
}
</script>

<style scoped>
.ad {
  margin-top: 25px;
  margin-bottom: 25px;
}
</style>
