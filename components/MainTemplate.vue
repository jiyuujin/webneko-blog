<template>
  <div>
    <slot />
    <div v-if="tags" class="tag-text">
      <template v-for="tag in tags">
        <div :key="tag.key" class="tag">
          <a :href="`/tag/${tag.key}`">
            {{ `${tag.key} (${tag.value})` }}
          </a>
        </div>
      </template>
    </div>
    <footer-text />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const FooterText = () => import('~/components/FooterText.vue')

export default Vue.extend({
  components: {
    FooterText
  },
  props: {
    tags: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
})
</script>
