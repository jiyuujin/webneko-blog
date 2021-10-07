---
date: 2019-02-03
title: Vue.js/Nuxt採用事例についての勉強会 リポート
description: (たまたま)翌日のLaravel/Vue.js Meetup #7(1/31)と同じ時期だったため、急遽【Nuxt.js/Vue.js】スタートアップ企業導入事例(1/30)にも参戦させていただきました。
slug: enter-the-startup-case-study-of-vue-js-and-nuxt
reaction: 💚
category: 
tags: 
 - Review
---

今回は Re:build 主催 Vue.js/Nuxt の採用事例に特化した勉強会。懇親会までは参戦せず。当日朝一大阪より飛んで、非常にお疲れでした。またの機会にもっとお話できればと考えています。

## Nuxt.js でモダン Web 設計

株式会社 Re:build の鈴木孝之さんの登壇、 Nuxt + Laravel + Firebase (Chat) = SPA という技術スタックで開発している話。以下の通りメリットを享受、一方でデメリットは現時点で存在していないのでは、とのこと。

1. ルーティング周り
2. ミドルウェアを使ったレンダリング処理の柔軟さ
3. 自由に使えるプラグイン

強いて言えばビルド時にブラックボックス化 (よく分からないエラーでコケる) ビルド時間が長いことを挙げられましたが、私も分かりみ深いなぁ、と言った感じでした。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/nuxt-dot-jstemotannawebahurishe-ji">Nuxt.js でモダン Web 設計</a>

## TABETE のフロントエンドを Nuxt.js でリプレイスする話

株式会社コークッキングの榊原徹哉さんの登壇、綺麗な API やサービスに必要な API 全て揃っている観点から Vue を使ったリプレイスを選択した話。

Vue の良さとして、入りやすさやコミュニティでの親切さは凄く感じているという話でした。

## Nuxt.js でプロダクトを開発して得た知見

株式会社 IT プロパートナーズの米川桂さんの登壇、規約やミドルウェアなど鈴木孝之さんの登壇とほぼ被った内容でした。技術以外でブランディング向上を実現。 PC/SP 対応やキャッシュ、といった自身の経験外だった分野の話もされ参考にさせていただきました。

1. mixins で動的に Component を分けた
   - 工夫した点は nuxtend を採用して、 asyncData で PC/SP を分けた。
2. Client/Server でキャッシュの扱いを変更した
   - Client で `universal-cookie`、 Server で c`ookie-universal-nuxt` を採用した。

## Vueと共に走ったフロントエンドリプレイス１年間

株式会社スタディストの小宮山智也さんの登壇、データ駆動周りやテスト(Karma)などロジックを中心に詳しく書かれているスライドでした。ですが明らかに登壇時間が足りていないことも痛感させられましたね。

1. Atomic Design を流用した
   - routerLayouts は画面レイアウトを共通化したようですが、 templates の代わりのように見えました。
2. ルーティングの肥大化に対応した
   - router-view を使うことを前提とする vue-router だからこそ、起こり得る問題だった。

上記の問題を経験して初めて Nuxt を採用しておけばもう少しマシになった、という話でした。

<a class="link-preview" href="https://speakerdeck.com/komiyamast/vuetogong-nizou-tutahurontoentorihureisu1nian-jian">Vue と共に走ったフロントエンドリプレイス１年間</a>
