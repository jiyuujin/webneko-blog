<template>
  <div class="switch">
    <label class="switch-label" for="btn-mode">
      <input id="btn-mode" type="checkbox" @input="change" />
      <span id="icon-rotate" class="switch-mode" />
    </label>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/hooks/useAppTheme'

export default {
  setup() {
    const { change } = useLayout()
    return { change }
  }
}
</script>
