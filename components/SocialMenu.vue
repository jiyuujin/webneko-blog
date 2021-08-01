<template>
  <div class="social-menu">
    <div
      v-for="item in SOCIAL_LIST"
      :key="item"
      :class="isVertical ? 'social-menu-vertical' : 'social-menu-horizontal'"
    >
      <img
        :src="`/icon/${item}.svg`"
        :alt="item"
        decoding="async"
        @click="handleClick(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useLayout } from '~/hooks/useAppTheme'

import { useWebShareSetup } from '~/hooks/useWebShare'
import {
  SOCIAL_LIST,
  TWITTER_URL,
  HATENA_URL,
  NOTE_URL
} from '~/utils/constants'

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

    const handleClick = (item: string) => {
      let url = ''

      if (item === 'twitter') {
        url = TWITTER_URL(props.title, props.slugText)
      } else if (item === 'hatena') {
        url = HATENA_URL(props.slugText)
      } else if (item === 'note') {
        url = NOTE_URL(props.slugText)
      }

      if (item !== 'share') {
        window.open(
          encodeURI(decodeURI(url)),
          'tweetwindow',
          'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
        )
      } else {
        useWebShareSetup(props.title, props.slugText)
      }
    }

    return { mode, SOCIAL_LIST, handleClick }
  }
}
</script>
