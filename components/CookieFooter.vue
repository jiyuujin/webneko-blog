<template>
  <j-cookie-footer
    :title="message"
    :url="url"
    @accept="$store.dispatch('product/accept', true)"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import useUtil from '~/composables/util'

export default defineComponent({
  setup() {
    return { ...useUtil() }
  }
})
</script>
