<template>
  <footer>
    <div class="footer-text">
      <div class="menu">
        <nuxt-link to="/profile">
          プロフィール
        </nuxt-link>
        <nuxt-link to="/contact">
          お問い合わせ
        </nuxt-link>
      </div>
      <div class="title">
        <profile-image
          width="50px"
          style="margin-right: 1.2em;"
        />
        {{ blogTitle }}
      </div>
      <div class="description">
        {{ blogDescription }}
      </div>
      <div class="copyright">
        {{ footerText }}
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const Card = () => import('~/components/profile/Card.vue')
const ProfileImage = () => import('~/components/profile/Image.vue')

@Component({
  components: {
    Card,
    ProfileImage
  }
})
export default class Footer extends Vue {
  blogTitle = 'Web猫ブログ';
  blogDescription = 'フロントエンドを中心にばりばり書いて、ゆるふわに交流しているなど。';
  footerText: string = 'Created © 2019 jiyuujin LAB. All Rights Reserved.';
}
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
  margin-bottom: 2em;
}

.menu a {
  color: #fff;
  margin-right: 1em;
  padding-right: 16px;
  background: url(../../static/external_link.png) no-repeat right center;
}

.title {
  display: flex;
  margin-bottom: 0.8em;
  align-items: center;
}

.description {
  display: flex;
  margin-bottom: 1.2em;
}

.copyright {
  display: flex;
}

@media (max-width: 500px) {
  footer {
    display: flex;
    padding: 1rem 2rem 1rem;
  }

  .menu {
    display: none;
  }

  .title {
    display: none;
  }

  .description {
    display: none;
  }
}
</style>
