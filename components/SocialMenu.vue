<template>
  <div
    :class="isVertical ? `social-menu--vertical` : `social-menu--horizontal`"
    class="social-menu"
  >
    <a
      v-for="item in socialMenu"
      :key="item"
      href="#"
      @click="handleClick(item)"
    >
      <img
        :src="`/${item}.png`"
        :alt="item"
        decoding="async"
      >
    </a>
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
            socialMenu: [
                'twitter',
                'hatena',
                'note'
            ] as string[]
        }
    },
    methods: {
        handleClick(item: string) {
            let url = ''

            if (item === 'twitter') {
                url = `http://twitter.com/share?text=${(this as any).title}&url=https://webneko.dev/posts/${(this as any).slugText}`
            } else if (item === 'hatena') {
                url = `http://b.hatena.ne.jp/entry/webneko.dev/posts/${(this as any).slugText}`
            } else {
                url = `https://note.mu/intent/post?url=https://webneko.dev/posts/${(this as any).slugText}`
            }

            window.open(encodeURI(decodeURI(url)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1')

            return false
        }
    }
})
</script>

<style lang="scss" scoped>
  .social-menu {
    z-index: 100;
    width: 4%;
    height: 0;

    img {
      width: 36px;
      height: 36px;
      margin: 8px;
      filter: #aaa;
      filter: grayscale(1);
      border-radius: 50%;

      &:hover,
      &:focus {
        background: #fff;
        filter: none;
        filter: grayscale(0);
        opacity: 100%;
      }
    }
  }

  .social-menu--vertical {
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    left: 2%;
  }

  .social-menu--horizontal {
    display: inline;
  }
</style>
