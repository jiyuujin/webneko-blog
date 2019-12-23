<template>
  <main-template>
    <div class="privacy-policy">
      <div class="title">
        プライバシーポリシー
      </div>
      <p>
        Yuma Kitamura (以下「当本人」といいます) は、当ブログ上で提供するサービス (以下「当ブログ」といいます) におけるプライバシー情報の取扱いについて、以下のとおりプライバシーポリシー (以下「本ポリシー」といいます) を定めます。
      </p>
      <h2>
        第1条 個人情報の利用目的
      </h2>
      <ul>
        <li>
          当ブログではお問い合わせの際に名前 (ハンドルネーム)、メールアドレス等の個人情報をご登録いただく場合がございます。これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
        </li>
      </ul>
      <h2>
        第2条 個人情報の第三者への開示
      </h2>
      <ul>
        <li>
          当ブログでは個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
        </li>
        <li>
          ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
        </li>
        <li>
          当ブログではGoogleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </li>
      </ul>
      <h2>
        第3条 免責事項
      </h2>
      <ul>
        <li>
          当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。当ブログのコンテンツ・情報につきまして可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり情報が古くなっていることもございます。また当ブログに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </li>
      </ul>
      <h3>
        本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
      </h3>
      <ul>
        <li>
          Name: Yuma Kitamura
        </li>
        <li>
          Email: jiyuujinunite@gmail.com
        </li>
      </ul>
    </div>

    <div class="contact">
      <div class="title">
        お問い合わせ
      </div>
      <new-contact category="manual" />
    </div>
  </main-template>
</template>

<script lang="ts">
import Vue from 'vue'
const MainTemplate = () => import('~/components/MainTemplate.vue')
const NewContact = () => import('~/components/NewContact.vue')

export default Vue.extend({
    components: {
        MainTemplate,
        NewContact
    },
    head() {
        return {
            title : '問い合わせ',
            meta: [
                { hid: 'description', name: 'description', content: '問い合わせするならこちらからお願いします。' },
                { hid: 'twitter:title', name: 'twitter:title', content: '問い合わせ' },
                { hid: 'twitter:description', name: 'twitter:description', content: '問い合わせするならこちらからお願いします。' },
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
                { hid: 'twitter:image', name: 'twitter:image', content: '' },
                { hid: 'og:type', name: 'og:type', content: 'article' },
                { hid: 'og:title', name: 'og:title', content: '問い合わせ' },
                { hid: 'og:description', name: 'og:description', content: '問い合わせするならこちらからお願いします' },
                { hid: 'og:url', name: 'og:url', content: '/contact' },
                { hid: 'og:image', name: 'og:image', content: '' }
            ]
        }
    }

})
</script>

<style lang="scss" scoped>
.privacy-policy,
.contact {
  width: 52%;
  margin: 2% 24% 2% 24%;
  font-size: 0.8em;
  .title {
    font-size: 1.2em;
    padding: 4px;
    text-align: center;
    color: #000;
    font-weight: bold;
    letter-spacing: 0.05em;
  }
  p {
    padding: 15px 20px;
    margin: 0;
    text-align: left;
  }
}

@media (max-width: 500px) {
  .privacy-policy,
  .contact {
    width: 98%;
    margin: 2% 1% 2% 1%;
  }
}
</style>
