---
date: 2019-08-21
title: FJUGと共催して開催しました
description: 盆明け FJUG共催、 v-kansai #9 を開催しました。
slug: enter-the-v-kansai-9-with-fjug-osaka
reaction: 🔥
category: 
tags: 
 - Vue
 - Firebase
 - Firestore
 - Review
---

## FJUG 共催でした

今回は Firebase Meetup in Osaka #5 / v-kansai #9 として開催。ハッシュタグは #fjug #v_kansai を使いました。

v-kansai としては今回初、有料イベントでした。

![](https://i.imgur.com/px1Ufzu.jpg)

### 秋田のお土産は好評だったようで

先日 CaT vol.7 参戦した自ら秋田のお土産を持ち寄りました。

![](https://i.imgur.com/dwO9Lkx.jpg)

簡単にスライドでも共有させていただきましたが、詳しくは [昨日のブログ](https://webneko.dev/posts/enter-the-cat-vol-7-in-akita) をご確認いただければ。

<a class="link-preview" href="https://slides.com/jiyuujin/20190821-01#/">CaT vol.7 in 秋田振り返り</a>

## Firebaseに纏わるLT

Yuji Onishi さんから、 [Flutter for web](https://flutter.dev/web) の話。基本的に `webdev serve` を叩くとローカルサーバが立ち上がりお手軽に始められるが、唯一ハマったことがあった。それはクロスコンパイル順に定義順を整えてくれなかったので、気をつけて欲しいという話でした。

(資料公開をお待ちください)

株式会社ラクス [加納 悠史 (@YKanoh65)](https://twitter.com/YKanoh65) さんから、ビアバッシュ専用 Web アプリを作った話。

連打に対する弱さについては分散カウンタを使って解決したが、あっさりと無料枠を超えてしまったのは課題のひとつ。

また Vuexfire を使うことで Vuex に大量のデータを保持、可読性が落ちてしまったことも課題だったようです。

<a class="link-preview" href="https://speakerdeck.com/ykanoh/apurizuo-cheng-toyun-yong-karaxue-bu-firebase-to-vue-dot-js-6a6c5d6f-0bee-4640-8d90-c0a3e51662dc">アプリ作成と運用から学ぶ Firebase と Vue.js</a>

フリュー株式会社 [@chan_kakuz](https://twitter.com/chan_kakuz) さんから多種多様なプラットフォームに応じてイベントを自由に変えられる Dynamic Links の特徴について。お手軽なリンクの管理に加えて、クリック数も管理できるメリットは嬉しいですね。

<a class="link-preview" href="https://slides.com/chan_kakuz/deck-6#/">What is Firebase Dynamic Links</a>

KYOSO 株式会社 [@is_ryo](https://twitter.com/is_ryo) さんから、今回の共催に相応しく Vue と Firestore を組み合わせて簡単な ToDo アプリの開発について。

CSS に Vuetify を使っているのでそこまで CSS の知識が無くても楽にデザインを整えられるのでオススメですね。

<a class="link-preview" href="https://docs.google.com/presentation/d/1NT58ZIe2xQOL_RsNW-r4K2_ep1w4fIK2IRHSjmsCsEs/mobilepresent?slide=id.g5faa9da147_1_0">Vue と Firestore で簡単 ToDo アプリ開発</a>

## Vueに纏わるLT

株式会社 MSEN [加藤 宗一郎 (@SAW)](https://twitter.com/SAW) さんから、 UI フレームワーク [Quasar](https://quasar.dev/) について。

最大の特徴のひとつに User Agent の検出に優れていること。使う機会があれば使ってみたいです。

<a class="link-preview" href="https://speakerdeck.com/azuki/quasar-kotohazime">Quasar ことはじめ</a>

[Daiki_Kojima (@Daikids2)](https://twitter.com/Daikids2) さんから。

Vue で PWA をやろうとしたらやらかした点について。

start_url の設定で上手くデプロイできない問題。Vue CLI で言う vue.config.js でその場に応じて設定を書けば解決するという話でした。

<a class="link-preview" href="https://speakerdeck.com/daikids2/vuedepwasurutokini-qi-wotuketeokitaitips">Vue で PWA するときに気をつけておきたい Tips</a>

[@salamander_jp](https://twitter.com/salamander_jp) さんから最近 beta 利用の可能となった Github Actions を使ってホスティング自動化する話。他の CI/CD と比較したときの違いが気になりましたが、 Gitlab-CI みたくリポジトリ一括運用によって恩恵を受けられるメリットは確かにありそうです。

<a class="link-preview" href="https://docs.google.com/presentation/d/1625hjBQG3MTf7T7QZUE9huYosDQhonMb_8Obiz4Scbc/mobilepresent?slide=id.p">GitHub Actions で Nuxt を Firebase Hosting にデプロイする</a>

## 最後に

次回の予定ですが v-kansai #10 は 9/18 (水) に大阪で開催します。

<a class="link-preview" href="https://vuekansai.connpass.com/event/143861/">v-kansai #10</a>

また FJUG 側の次回は Firebase Summit 報告会として 10/29 (火) に大阪で開催するそうです。

<a class="link-preview" href="https://fjug-osaka.connpass.com/event/143545/">FJUG Osaka #6</a>

フロントエンドカンファレンス関西 2019 はスポンサー・登壇者絶賛募集中です。

<a class="link-preview" href="https://2019.kfug.jp/">kfug 2019</a>
