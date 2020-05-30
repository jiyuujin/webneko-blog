<template>
  <footer>
    <div class="footer-text">
      <div class="menu">
        <nuxt-link v-if="$route.path !== '/'" to="/">
          トップ
        </nuxt-link>
        <nuxt-link :to="`/archives/${getCurrentMonth}`">
          アーカイヴ
        </nuxt-link>
        <nuxt-link to="/contact">
          お問い合わせ
        </nuxt-link>
      </div>
      <div class="copyright">
        Created © 2018-2020 jiyuujin LAB. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  computed: {
    getCurrentMonth(): string {
      return dayjs().format('YYYY-MM')
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-text {
  padding: 16px 0 8px;
  margin: auto;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
  vertical-align: center;

  @media screen and (prefers-reduced-motion: reduce) {
    a {
      margin-right: 16px;
      overflow: hidden;
      color: #000;
      background-color: #fff;
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: none;

      @media screen and (prefers-reduced-motion: reduce) {
        &::before {
          position: absolute;
          top: 0;
          left: -100%;
          z-index: -1;
          width: 100%;
          height: 100%;
          content: '';
          background-color: #ecf0f1;
          -webkit-transition: all 0.3s ease-in-out;
          -o-transition: all 0.3s ease-in-out;
          transition: none;
        }
      }

      &::before {
        position: absolute;
        top: 0;
        left: -100%;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        background-color: #ecf0f1;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
      }

      &:hover,
      &:focus {
        color: #42b883;
      }
    }
  }

  a {
    margin-right: 16px;
    overflow: hidden;
    color: #000;
    background-color: #fff;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    @media screen and (prefers-reduced-motion: reduce) {
      &::before {
        position: absolute;
        top: 0;
        left: -100%;
        z-index: -1;
        width: 100%;
        height: 100%;
        content: '';
        background-color: #ecf0f1;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: none;
      }
    }

    &::before {
      position: absolute;
      top: 0;
      left: -100%;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      background-color: #ecf0f1;
      -webkit-transition: all 0.3s ease-in-out;
      -o-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
    }

    &:hover,
    &:focus {
      height: 100%;
      padding: 8px;
      margin-bottom: -8px;
      margin-left: -8px;
      background: #42b883;
      border-radius: 3px;
      box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1), 0 5px 11px rgba(0, 0, 0, 0.25);
    }
  }
}

.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8vmin;
}

@media (max-width: 500px) {
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

@media (prefers-color-scheme: dark) {
  .menu {
    a {
      color: #fff;
      background-color: #303030;
    }
  }
}
</style>
