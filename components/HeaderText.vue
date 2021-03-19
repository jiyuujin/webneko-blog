<template>
  <div class="header">
    <div class="author">
      <h1>Web猫ブログ</h1>
    </div>
    <mode-change key="top-mode-change" />
  </div>
</template>

<script lang="ts">
const ModeChange = () => import('~/components/ModeChange.vue')

export default {
  components: {
    ModeChange
  }
}
</script>
