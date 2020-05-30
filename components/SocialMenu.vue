<template>
  <div class="social-menu">
    <div
      :class="isVertical ? `social-menu--vertical` : `social-menu--horizontal`"
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
import Vue, { PropType } from 'vue'

export default Vue.extend({
  props: {
    slugText: {
      type: String as PropType<string>,
      default: ''
    },
    title: {
      type: String as PropType<string>,
      default: ''
    },
    isVertical: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  data() {
    return {
      socialMenu: ['twitter', 'hatena', 'note'] as string[]
    }
  },
  methods: {
    handleClick(item: string) {
      let url = ''

      if (item === 'twitter') {
        url = `http://twitter.com/share?text=${
          (this as any).title
        }&url=https://webneko.dev/posts/${(this as any).slugText}`
      } else if (item === 'hatena') {
        url = `http://b.hatena.ne.jp/entry/webneko.dev/posts/${
          (this as any).slugText
        }`
      } else {
        url = `https://note.mu/intent/post?url=https://webneko.dev/posts/${
          (this as any).slugText
        }`
      }

      window.open(
        encodeURI(decodeURI(url)),
        'tweetwindow',
        'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'
      )

      return false
    }
  }
})
</script>
