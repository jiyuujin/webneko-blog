<template>
  <div class="biography">
    <title-label
      :is-center="!isCenter"
      :is-bold="!isBold"
      width="92%"
      horizontal-margin="4%"
    >
      Webエンジニア。2018年10月より運営の当ブログを始め、Vue.jsやNuxtを使ったフロントエンドを中心に設計・開発しています。最近は関数型プログラミング言語を中心に、サーバーサイドのScalaやKotlinを学んでいます。
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
        >
      </div>
    </title-label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
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
  skillset: string[] = SKILL_SET;
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.header h2 {
  font-size: 18px;
}

.header h3 {
  font-size: 14px;
}
.biography ul li {
  margin-bottom: 15px;
  text-align: left;
}

.skill__icon {
  text-align: center;
}

.skill__icon img {
  width: 25px;
  height: 25px;
  margin-left: 15px;
  margin-right: 15px;
}
</style>
