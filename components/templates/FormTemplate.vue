<template>
  <div class="form">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class FormTemplate extends Vue {}
</script>

<style scoped>
.form {
  width: 80%;
  margin: 0 auto;
  padding: 2px;
}
</style>
