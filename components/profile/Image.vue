<template>
  <div class="avatar">
    <img
      :style="`max-width: ${width};`"
      src="../../static/nekos.png"
      alt="avatar"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Image extends Vue {
  @Prop() width: string;
}
</script>

<style scoped>
.avatar {
  position: relative;
  z-index: 1;
}

.avatar img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 500rem;
}
</style>
