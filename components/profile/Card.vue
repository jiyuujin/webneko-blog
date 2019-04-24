<template>
  <div
    :style="`background-color: ${backgroundColor}; color: ${color};`"
    class="header"
  >
    <div class="avatar">
      <img
        src="../../static/bakeneko.png"
        alt="avatar"
      >
    </div>
    <h2>
      Web猫
    </h2>
    <h3>
      jiyuujin LAB.
    </h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Card extends Vue {
  @Prop() backgroundColor: string;
  @Prop() color: string;
}
</script>

<style scoped>
.header {
  max-width: 100%;
  display: flex;
  padding: 2.4rem 2rem 0;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.avatar {
  position: relative;
  z-index: 1;
}

.avatar img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 150px;
  border-radius: 500rem;
}
</style>
