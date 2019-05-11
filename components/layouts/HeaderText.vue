<template>
  <div class="header">
    <div class="profile">
      <p>
        <a href="https://webneko.info/profile">
          プロフィール
        </a>
      </p>
    </div>
    <div class="title">
      <h2>
        Web猫ブログ
      </h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class HeaderText extends Vue {}
</script>

<style scoped>
.header {
  text-align: center;
  max-width: 1440px;
  min-height: 240px;
  background-image: url('../../static/neko.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
}

.profile {
  position: absolute;
  top: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
}

.profile a {
  text-decoration: none;
  margin: 0 1em;
  padding-right: 16px;
  background: url(../../static/external_link.png) no-repeat right center;
  color: #fff;
}

.title {
  display: inline;
  top: 50%;
  text-align: center;
  padding: 20px;
  line-height: 1;
  transform: translateY(-50%);
  color: #fff;
  font-size: 2rem;
}
</style>
