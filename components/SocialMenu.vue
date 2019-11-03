<template>
  <div>
    <div
      :class="isVertical ? `vertical` : `horizontal`"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
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
            defaut: false
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

<style scoped>
.social-menu {
  z-index: 100;
  width: 4%;
  height: 0;
}

.vertical {
  position: -webkit-sticky;
  position: sticky;
  left: 2%;
  top: 60px;
}

.horizontal {
  display: inline;
}

.social-menu img {
  width: 36px;
  height: 36px;
  margin: 8px;
  border-radius: 50%;
	filter: #aaa;
  -webkit-filter: grayscale(1);
	filter: grayscale(1);
}

.social-menu img:hover {
  background: #fff;
  opacity: 100%;
  filter: none;
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
}

@media (max-width: 500px) {
  .social-menu {
    display: none;
  }
}
</style>
