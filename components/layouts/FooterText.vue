<template>
  <footer>
    <div class="footer-text">
      <profile-card
        name="フロントエンドを中心にばりばり書いて、ゆるふわに交流しているなど。"
        nickname="Web猫ブログ"
        :imgName="imgName"
        background-color="#35495e"
      ></profile-card>
      <div class="menu">
        <a href="https://nekohack.app/docs">
          プロフィール
        </a>
        <nuxt-link to="/contact">
          お問い合わせ
        </nuxt-link>
      </div>
      <div class="copyright">
        Created © 2019 jiyuujin LAB. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      imgName: require('../../static/bakeneko2.png')
    }
  }
})
</script>

<style scoped>
footer {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 30px 0;
  background-color: #35495e;
  color: #fff;
  max-width: 100%;
}

.footer-text {
  padding: 24px 0 12px;
  margin: auto;
}

.menu {
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
}

.menu a {
  color: #fff;
  margin-right: 1em;
  padding-right: 16px;
  background: url(../../static/external_link.png) no-repeat right center;
}

.copyright {
  display: flex;
  vertical-align: center;
  align-items: center;
  justify-content: center;
}

@media (max-width: 500px) {
  footer {
    margin-top: 0;
    min-height: 0;
    padding: 1rem 2rem 1rem;
  }

  .menu {
    display: none;
  }
}
</style>
