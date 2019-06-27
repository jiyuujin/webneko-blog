<template>
  <div
    :style="`background: linear-gradient(transparent 70%, ${color} 70%); width: ${width}; margin: 16px ${horizontalMargin} 16px;`"
    :class="[isCenter ? `center` : `left`, isBold ? `bold` : ``]"
    class="title"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class TitleLabel extends Vue {
  @Prop() color!: string;
  @Prop() isCenter!: boolean;
  @Prop() isBold!: boolean;
  @Prop() width!: string;
  @Prop() horizontalMargin!: string;
}
</script>

<style scoped>
.title {
  font-size: 16px;
  color: #000;
}

.center {
  text-align: center;
}

.left {
  text-align: left;
}

.bold {
  font-weight: bold;
}
</style>
