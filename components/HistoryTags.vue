<template>
  <div v-if="tags" class="tag-text">
    <template v-for="tag in tags">
      <div :key="tag.key" class="tag">
        <a :href="`/tag/${tag.key}`">
          {{ `${tag.key} (${tag.value})` }}
        </a>
      </div>
    </template>
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
