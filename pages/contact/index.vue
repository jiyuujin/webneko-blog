<template>
  <main-template>
    <div class="contact">
      <h2>
        お問い合わせ
      </h2>
      <p>
        お仕事のご依頼や当ブログに対するご提案などご気軽に
      </p>
      <new
        category="manual"
      />
      <div class="privacy-policy">
        <div class="privacy-policy-title">
          プライバシーポリシー
        </div>
        <p>
          <privacy-policy />
        </p>
      </div>
    </div>
  </main-template>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const MainTemplate = () => import('~/components/MainTemplate.vue')
const New = () => import('~/components/NewContact.vue')
const PrivacyPolicy = () => import('~/components/PrivacyPolicy.vue')

@Component({
    components: {
        MainTemplate,
        New,
        PrivacyPolicy
    }
})
export default class Index extends Vue {}
</script>

<style scoped>
.contact {
  text-align: center;
}

.privacy-policy {
  width: 84%;
  margin: 12px 8%;
  background: #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22);
}

.privacy-policy .privacy-policy-title {
  font-size: 1.2em;
  background: #42b883;
  padding: 4px;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  letter-spacing: 0.05em;
}

.privacy-policy p {
  padding: 15px 20px;
  margin: 0;
  text-align: left;
}
</style>
