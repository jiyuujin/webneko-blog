<template>
  <label class="tag-text">
    {{ tagText }}
  </label>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class LabelForm extends Vue {
  @Prop() tagText!: string;
}
</script>

<style scoped>
.tag-text {
  border: medium solid #d3d3d3;
  border-radius: 24px;
  overflow: hidden;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-out;
  letter-spacing: 0;
  font-size: 0.75rem;
  margin: 12px 4px;
  padding: 0.4rem 0.8rem;
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
