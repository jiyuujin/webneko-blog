<template>
  <footer>
    <div class="footer-text">
      <profile-card
        name="Yuma Kitamura"
        nickname="Web猫"
        :img-name="imgName"
        background-color="#35495e"
      />
      <div class="menu">
        <a href="https://yuukit.me/">
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

<style lang="scss" scoped>
  footer {
    align-items: center;
    background-color: #35495e;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 24px;
    max-width: 100%;
    min-height: 300px;
    padding: 30px 0;
  }

  .footer-text {
    margin: auto;
    padding: 24px 0 12px;
  }

  .menu {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    vertical-align: center;

    a {
      color: #fff;
      padding-right: 16px;
    }
  }

  .copyright {
    align-items: center;
    display: flex;
    font-size: 1.8vmin;
    justify-content: center;
  }

  @media (max-width: 500px) {
    footer {
      margin-top: 0;
      min-height: 0;
    }

    .menu {
      display: flex;
      flex-direction: column;

      a {
        margin-bottom: 12px;
      }
    }

    .copyright {
      font-size: 12px;
    }
  }
</style>
