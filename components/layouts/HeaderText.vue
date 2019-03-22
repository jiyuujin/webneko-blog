<template>
  <div class="header">
    <title-label
      :is-center="isCenter"
      :is-bold="isBold"
      width="40%"
      horizontal-margin="30%"
      color="#42b883"
    >
      Services
    </title-label>
    <div class="concept">
      <title-label
        :is-center="isCenter"
        width="40%"
        horizontal-margin="30%"
        color="#35495e"
      >
        筆者について
      </title-label>
      <title-label
        :is-center="isCenter"
        width="92%"
        horizontal-margin="4%"
      >
        <nuxt-link
          to="/profile"
        >
          プロフィール
        </nuxt-link>
        をご覧ください
      </title-label>
    </div>
    <div class="concept">
      <title-label
        :is-center="isCenter"
        width="40%"
        horizontal-margin="30%"
        color="#35495e"
      >
        伝えたい内容
      </title-label>
      <title-label
        :is-center="isCenter"
        width="92%"
        horizontal-margin="4%"
      >
        記録として残したいことを中心に投稿しています
      </title-label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const TitleLabel = () => import('~/components/atoms/TitleLabel.vue')

@Component({
  components: {
    TitleLabel
  }
})
export default class Header extends Vue {
  isCenter: boolean = true;
  isBold: boolean = true;
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-left: 12%;
  margin-right: 12%;
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
}

.header a {
  text-decoration: none;
  margin: 0 1em;
  padding-right: 16px;
  background: url(../../static/external_link.png) no-repeat right center;
}

.concept {
  width: calc(50% - 24px);
  margin: 8px;
  padding: 8px;
  border: 1px solid #808080;
  box-shadow:5px 5px;
}

@media (max-width: 500px) {
  .concept {
    width: calc(100% - 10px);
    margin: 4px;
  }
}
</style>
