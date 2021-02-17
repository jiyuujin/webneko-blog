<template>
  <div class="switch">
    <label class="switch-label">
      <input id="btn-mode" type="checkbox" @input="change" />
      <span id="icon-rotate" class="switch-mode" />
    </label>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/composables/layout'

export default {
  setup() {
    const { change } = useLayout()
    return { change }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/switch';
</style>
