<template>
  <footer>
    <div class="footer-text">
      <profile-card
        name="Yuma Kitamura"
        nickname="Web猫"
        :imgName="imgName"
        background-color="#35495e"
      ></profile-card>
      <div class="menu">
        <a href="https://nekohack.app/docs">
          プロフィール
        </a>
        <nuxt-link :to="`/archives/${getCurrentMonth}`">
          アーカイヴ
        </nuxt-link>
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
import dayjs from 'dayjs'

export default Vue.extend({
  data() {
    return {
      imgName: require('../static/bakeneko2.png')
    }
  },
  computed: {
    getCurrentMonth(): string {
      return dayjs().format('YYYY-MM')
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
  background: url(../static/external_link.png) no-repeat right center;
}

.menu a:last-child {
  margin-right: 0;
}

.copyright {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8vmin;
}

@media (max-width: 500px) {
  footer {
    margin-top: 0;
    min-height: 0;
  }

  .copyright {
    font-size: 12px;
  }
}
</style>
