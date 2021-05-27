<template>
  <div v-if="tags" class="tags">
    <div v-for="tag in tags" :key="tag.key" class="tag">
      <a :href="`/tag/${tag.key}`">
        {{ `${tag.key} (${tag.value})` }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tags: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>
