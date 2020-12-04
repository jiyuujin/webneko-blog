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
input[type='checkbox'] {
  display: none;
}

.switch {
  position: fixed;
  top: 0.5em;
  right: 0.5em;
  font-size: 60px;
}

.switch-label {
  cursor: pointer;
}

@media screen and (prefers-reduced-motion: reduce) {
  .switch-mode {
    position: absolute;
    top: -120px;
    right: -120px;
    display: block;
    width: 200px;
    height: 200px;
    transition: none;
    transform: rotate(0);

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '⛅️';
    }

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      content: '🌙';
      transform: scale(1, -1);
    }
  }
}

.switch-mode {
  position: absolute;
  top: -120px;
  right: -120px;
  display: block;
  width: 200px;
  height: 200px;
  transition: transform 1s;
  transform: rotate(0);

  &::before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: '⛅️';
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    content: '🌙';
    transform: scale(1, -1);
  }
}
</style>
