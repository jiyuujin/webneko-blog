<template>
  <div class="social-menu">
    <div
      :class="isVertical ? 'social-menu-vertical' : 'social-menu-horizontal'"
    >
      <a
        v-for="item in socialMenu"
        :key="item"
        href="#"
        @click="handleClick(item)"
      >
        <img :src="`/icon/${item}.png`" :alt="item" decoding="async" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import SocialCompoable from '~/composables/social'

type SocialMenuProps = {
  slugText: string
  title: string
  isVertical: boolean
}

export default defineComponent({
  props: {
    slugText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isVertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props: SocialMenuProps, ctx: SetupContext) {
    const socialModule = SocialCompoable(props, ctx)
    return { ...socialModule }
  }
})
</script>
