<template>
  <div class="social-menu">
    <div
      v-for="item in socialMenu"
      :key="item"
      :class="isVertical ? 'social-menu-vertical' : 'social-menu-horizontal'"
    >
      <img
        v-if="mode === 'light'"
        :src="`/icon/${item}-black.svg`"
        :alt="item"
        decoding="async"
        @click="handleClick(item)"
      />
      <img
        v-if="mode === 'dark'"
        :src="`/icon/${item}-white.svg`"
        :alt="item"
        decoding="async"
        :style="{ backgroundColor: '#fff' }"
        @click="handleClick(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/composables/layout'

export default {
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
  setup(props, ctx) {
    const { mode } = useLayout()

    const socialMenu = ['twitter', 'hatena', 'note']

    const handleClick = (item: string) => {
      let url = ''

      if (item === 'twitter') {
        url = `http://twitter.com/share?text=${props.title}&url=https://webneko.dev/posts/${props.slugText}`
      } else if (item === 'hatena') {
        url = `http://b.hatena.ne.jp/entry/webneko.dev/posts/${props.slugText}`
      } else {
        url = `https://note.mu/intent/post?url=https://webneko.dev/posts/${props.slugText}`
      }

      window.open(
        encodeURI(decodeURI(url)),
        'tweetwindow',
        'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
      )

      return false
    }

    return { mode, socialMenu, handleClick }
  }
}
</script>
