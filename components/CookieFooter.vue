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

type CookieFooterProps = {
  //
}

export default defineComponent({
  setup(props: CookieFooterProps, ctx: SetupContext) {
    const utilModule = UtilComposable(props, ctx)
    return { ...utilModule }
  }
})
</script>
