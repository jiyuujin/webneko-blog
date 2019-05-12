<template>
  <div class="social-menu">
    <a
      :href="`http://twitter.com/share?text=${title}&url=https://webneko.info/posts/${slugText}`"
      onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;"
    >
      <img
        src="../../static/twitter.png"
        alt="twitter"
      >
    </a>
    <a
      :href="`http://b.hatena.ne.jp/entry/webneko.info/posts/${slugText}`"
      onClick="window.open(encodeURI(decodeURI(this.href)), 'tweetwindow', 'width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1'); return false;"
    >
      <img
        src="../../static/hatena.png"
        alt="hatena"
      >
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from '~/node_modules/nuxt-property-decorator'

@Component({})
export default class SocialMenu extends Vue {
  @Prop() slugText: string;
  @Prop() title: string;
}
</script>

<style scoped>
.social-menu {
  position: sticky;
  left: 2%;
  top: 60px;
  z-index: 100;
  width: 4%;
  height: 0;
}

.social-menu img {
  width: 32px;
  height: 32px;
  margin: 8px;
  border-radius: 50%;
}

@media (max-width: 500px) {
  .social-menu {
    display: none;
  }
}
</style>
