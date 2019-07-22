<template>
  <div
    :style="isSide ? `display: inline;` : `position: sticky; left: 2%; top: 60px;`"
    class="social-menu"
  >
    <a
      :href="`http://twitter.com/share?text=${title}&url=https://webneko.dev/posts/${slugText}`"
      onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;"
    >
      <img
        src="../../static/twitter.png"
        alt="twitter"
        decoding="async"
      >
    </a>
    <a
      :href="`http://b.hatena.ne.jp/entry/webneko.dev/posts/${slugText}`"
      onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;"
    >
      <img
        src="../../static/hatena.png"
        alt="hatena"
        decoding="async"
      >
    </a>
    <a
      :href="`https://note.mu/intent/post?url=https://webneko.dev/posts/${slugText}`"
      onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;"
    >
      <img
        src="../../static/note.png"
        alt="note"
        decoding="async"
      >
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class SocialMenu extends Vue {
  @Prop() slugText: string;
  @Prop() title: string;
  @Prop() isSide: boolean;
}
</script>

<style scoped>
.social-menu {
  z-index: 100;
  width: 4%;
  height: 0;
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
