<template>
  <div>
    <title-label
      :is-center="!isCenter"
      :is-bold="!isBold"
      width="92%"
      horizontal-margin="4%"
    >
      <div :style="`font-size: ${fontSize};`">
        Webエンジニア。2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。最近は関数型プログラミング言語を中心に、サーバーサイドのScalaやKotlinを学んでいます。
      </div>
    </title-label>
    <title-label
      v-if="$route.name === `profile`"
      width="92%"
      horizontal-margin="4%"
    >
      <div class="skill__icon">
        <img
          v-for="item in skillset"
          :key="item"
          :src="'./' + item + '.png'"
          :alt="item"
          decoding="async"
        >
      </div>
    </title-label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import TitleLabel from '~/components/atoms/TitleLabel.vue'

const SKILL_SET: string[] = [
  'aws',
  'firebase',
  'intellij',
  'laravel',
  'nuxt',
  'swift',
  'typescript',
  'vue'
];

@Component({
  components: {
    TitleLabel
  }
})
export default class Biography extends Vue {
  @Prop() fontSize: string;

  skillset: string[] = SKILL_SET;
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.skill__icon {
  text-align: center;
}

.skill__icon img {
  width: 48px;
  height: 48px;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
