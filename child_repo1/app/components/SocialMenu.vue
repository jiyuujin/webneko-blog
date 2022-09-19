<template>
  <div class="social-menu">
    <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
    <a
      v-for="item in SOCIAL_LIST"
      :key="item"
      :href="urlText(item)"
      role="button"
      :class="isVertical ? 'social-menu-vertical' : 'social-menu-horizontal'"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template v-if="item === 'twitter'">
        <TwitterLogo />
      </template>
      <template v-if="item === 'note'">
        <NoteLogo />
      </template>
      <template v-if="item === 'hatena'">
        <HatenaLogo />
      </template>
    </a>
  </div>
</template>

<script lang="ts">
import TwitterLogo from '~/assets/twitter_logo.svg'
import NoteLogo from '~/assets/note_logo.svg'
import HatenaLogo from '~/assets/hatena_logo.svg'
import { useWebShareSetup } from '~/hooks/useWebShare'
import {
  SOCIAL_LIST,
  TWITTER_URL,
  HATENA_URL,
  NOTE_URL
} from '~/utils/constants'

export default {
  components: {
    TwitterLogo,
    NoteLogo,
    HatenaLogo
  },
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
    const urlText = (item: string) => {
      if (item === 'twitter') {
        return TWITTER_URL(props.title, props.slugText)
      } else if (item === 'hatena') {
        return HATENA_URL(props.slugText)
      } else if (item === 'note') {
        return NOTE_URL(props.slugText)
      }
      return ''
    }

    const tweetWindow = (item: string) => {
      window !== undefined && window.open(
        encodeURI(decodeURI(urlText(item))),
        'tweetwindow',
        'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
      )
    }

    const webShare = () => {
      window !== undefined && useWebShareSetup(props.title, props.slugText)
    }

    return { SOCIAL_LIST, urlText, tweetWindow, webShare }
  }
}
</script>
