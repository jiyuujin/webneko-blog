<template>
  <j-cookie-footer
    :title="message"
    :url="url"
    @accept="$store.dispatch('product/accept', true)"
  />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

import UtilComposable from '~/composables/util'

export default defineComponent({
  setup(props: {}, ctx: SetupContext) {
    const utilModule = UtilComposable({}, ctx)
    return { ...utilModule }
  }
})
</script>
