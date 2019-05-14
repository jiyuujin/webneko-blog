<template>
  <label
    :style="`background-color: ${backgroundColor}; color: ${color}; border: solid 4px ${backgroundColor};`"
    class="tag-text"
  >
    {{ tagText }}
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class LabelForm extends Vue {
  @Prop() tagText!: string;
  @Prop() backgroundColor!: string;
  @Prop() color!: string;
}
</script>

<style scoped>
.tag-text {
  border: solid 4px #d3d3d3;
  border-radius: 24px;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-out;
  letter-spacing: 0;
  font-size: 0.75rem;
  margin: 4px 2px;
  padding: 0.2rem 0.4rem;
  height: 24px;
  line-height: 12px;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  align-items: center;
}

.tag-text:hover {
  border: medium solid #ff4500;
}
</style>
