---
date: 2019-07-25
title: V-KANSAI #8 リポート
description: おかげさまで第8弾となりましたが、株式会社chatbox 新オフィスで開催されました。
slug: enter-the-v-kansai-8-in-osaka
reaction: 8️⃣
category: 
tags: 
 - Vue
 - TypeScript
 - Review
---

有り難く #8 でした。

今回は最近移転の株式会社 chatbox 新オフィスで開催しています。

![](https://i.imgur.com/MP6jsIN.jpg)

### Vue と TypeScript、私

[泉亮輔 (@is_ryo)](https://twitter.com/is_ryo) さんから、 Vue と TS を `Vue.extend` と `vue-property-decorator` を使う方法をそれぞれご紹介。

<a class="link-preview" href="https://docs.google.com/presentation/d/1Djx0Gw0oK7dI_2FKWxcWn3AvdF5NsOIbpv77u70zj1g/edit#slide=id.g5ce7141149_2_25">Vue と TypeScript、私</a>

![vue-ts-and-me](//images.ctfassets.net/gzkue3szf85p/5eA8FcWBV1bAfVcQysMzZD/4a5e4611bd5e447c68c63835f308ca24/IMG_2109.jpeg)

### Google Nest Hub で Vue を使った話他

Line API Expert [がおまる (@gaomar)](https://twitter.com/gaomar) さんから、 `interactiveCanvas` API を使えば実現できるそう。 IoT デバイスが近づくと AWS Connect から得られる認証画面を Vue で作ったとのこと。前提としてコンソールでゲームカテゴリーを選択する必要はあるが、使える JavaScript に制限があることにも注意しなければいけない。

詳しくは以下の記事をご確認いただければ、ということでした。

<a class="link-preview" href="https://qiita.com/h-takauma/items/1425abe44a050dfb3269">Google Nest Hub の画面対応方法</a>

<a class="link-preview" href="https://qiita.com/h-takauma/items/acfbe4a3bec8c04a696d">ちょっとだけセキュアな認証システムを LINE Things でやってみた</a>

### Vue3 で登場予定の Function API

[Daiki Kojima (@Daikids2)](https://twitter.com/Daikids2) さんから、 Vue3 で登場が予定されている Function API について。

特に気になった `Watch` の存在。素直に監視する値を返す訳ではなく、関数の形式で返しているという仕様があるようです。

<a class="link-preview" href="https://speakerdeck.com/daikids2/function-api-you-will-use-in-future">Function API You will use in future</a>

### 読みづらい / わかりづらいコード

[ショウノシオリ (@shosho_egg)](https://twitter.com/shosho_egg) さんから、 `v-if` や `props` が多過ぎると読み辛いコードになることを例に挙げられました。責務分離を前提に設計を考えることがいかに重要か、 `template` にロジックを混在させてはいけないといったことなど、改めて考えさられる場面がありました。

### VuexFireSQL

アマゾンジャパン合同会社 [@salamander_jp](https://twitter.com/salamander_jp) さんから、 Firebase をオマージュした VuexFireSQL について。私は初耳でしたが、リアルタイム性を強みに vuex の `state` を自動で同期してくれるようです。ただし、セキュリティで若干怪しいという話でした。

<a class="link-preview" href="https://github.com/GitHub30/vuexfiresql">VuexFireSQL</a>

<a class="link-preview" href="https://docs.google.com/presentation/d/1Upxy7Bgb6gyQhOor5GFT7_bKke1Aq5A2c0Ulg0Fdz_o/mobilepresent">VuexFireSQL</a>

### Functional Component

フリュー株式会社 [@chan_kakuz](https://twitter.com/chan_kakuz) さんから、 Functional Component について。パフォーマンス面で良い影響を与えることができる (定量的な数値も出ている) ようですが、 Vue 初心者の多いプロジェクト等ではオススメしません。

<a class="link-preview" href="https://slides.com/chan_kakuz/deck-4#/">Functional Component in Vue.js</a>

### vue-infinite-loading

最後に [@jiyuujin](https://twitter.com/jiyuujinlab) 自ら、最近お仕事などで使う場面があった無限スクロールについて。 vue-infinite-loading を Vue/Nuxt (TypeScript) ベースのプロジェクトで入れた経験を喋らせていただきました。

<a class="link-preview" href="https://webneko.dev/posts/infinite-loading-in-webneko-blog">無限スクロールを導入する</a>

<a class="link-preview" href="https://slides.com/jiyuujin/20190724">無限スクロールの話</a>

## 最後に、

次回 #9 は京都の回、来月 21 日 Firebase 日本ユーザーグループさんと共催です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/137411/">v-kansai #9</a>

また Vue ではありませんが、kansai.ts #2 は 26 日 (金) に募集開始を予定しています。

<a class="link-preview" href="https://kansaits.connpass.com/event/131541/">kansai.ts #2</a>
