<template>
  <div>
    <div
      :style="`background-color: ${backgroundColor}; color: ${color};`"
      class="header"
    >
      <profile-image
        width="150px"
      />
      <h2>
        Web猫
      </h2>
      <h3>
        jiyuujin LAB.
      </h3>
    </div>
    <title-text
      :is-center="!isCenter"
      :is-bold="!isBold"
      width="92%"
      horizontal-margin="4%"
    >
      <div :style="`font-size: ${fontSize};`">
        Webエンジニア。2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。最近は関数型プログラミング言語を中心に、サーバーサイドのScalaやKotlinを学んでいます。
      </div>
    </title-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
const TitleText = () => import('~/components/atoms/TitleText.vue')
const ProfileImage = () => import('~/components/profile/ProfileImage.vue')

@Component({
  components: {
    TitleText,
    ProfileImage
  }
})
export default class Card extends Vue {
  @Prop() backgroundColor: string;
  @Prop() color: string;
  @Prop() fontSize: string;
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.header {
  max-width: 100%;
  display: flex;
  padding: 2.4rem 2rem 0;
  width: 100%;
  flex-direction: column;
  align-items: center;
}
</style>
