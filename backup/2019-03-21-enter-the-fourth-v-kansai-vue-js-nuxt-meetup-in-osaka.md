---
date: 2019-03-21
title: V-KANSAI #4 リポート
description: 早くも 第4弾の開催となりました。会場提供いただいたヤフーさま、ご協力いただきありがとうございました。
slug: enter-the-fourth-v-kansai-vue-js-nuxt-meetup-in-osaka
reaction: 4️⃣
category: 
tags: 
 - Vue
 - Nuxt
 - AWS
 - Review
---

京都と異なり大所帯になるケースが多い大阪。今回第 4 弾も参加所定枠 30 名に対し 70 名以上の参加が集まった。

## Web猫ブログに型安全を

自ら登壇。一昨日 3/18 にブログを更新させていただきました (下記のリンク参照)

LT の中でも触れましたが、予定より大幅に早まって既に `nuxt-ts build` の形式で本番稼働を始めています。 Vuex ストアの周りの変更には注意をしつつ、今後も安定的な TypeScript サポートを期待したいですね。

<a class="link-preview" href="https://webneko.info/posts/typesafed-webneko-blog-used-nuxt-ts">Web 猫ブログを TypeScript 化しました</a>

## 登壇の数々を軽く

### NuxtとNetlifyが優しい件について

株式会社 chatbox の [@riri_mohu さん](https://twitter.com/riri_mohu) の登壇、Nuxt と Netlify が優しい件についての話。文字通り Nuxt の環境を構築することは非常に簡単で、 `npx` コマンドで簡単に作ることができる。

```bash
npx create-nuxt-app <アプリケーション名>
```

またファイル構成が明確で分かり易い。

Web アプリケーションの開発に便利なツールが揃っている (Store や Vue Router など) Netlify も `nuxt` コマンドを叩くだけでデプロイできる話でした。

### Nuxt.jsのディレクトリ

株式会社 chatbox テックリードの [ショウノシオリさん](https://twitter.com/shosho_egg) の登壇、ディレクトリ構成のわかりやすい Nuxt。リソースや画面を作る Component、設定ファイルに分類。作り始めると状態を管理するためのストアや外部パッケージを一括で管理するプラグインを使うと良い話でした。

<a class="link-preview" href="https://speakerdeck.com/sshono1210/nuxt-dot-js-falsedeirekutori">Nuxt.js のディレクトリ</a>

### 揮発性の高いコンポーネントを開発した話

[@_uhck さん](https://twitter.com/_uhck) の登壇、Notice 系のコンポーネントを作った話。そもそも揮発性の高いというのは、一時的に使用されることを意味するようです。グローバルで呼び出し、必要に応じて使用・削除できるものを目指す。state やローカルのデータを圧迫しないことを目的に、メンテの向上を図るというもの。以下デモンストレーションも示されており、 DOM の中に Component が突っ込まれる仕様でした。

<a class="link-preview" href="https://github.com/in-the-box/vue-dialog">vue-dialog</a>

<a class="link-preview" href="https://speakerdeck.com/uhck/hui-fa-xing-falsegao-ikonponentowozuo-ruhua">揮発性の高いコンポーネントを開発した話</a>

### Capacitorの話

Ionic Japan UG Organizer、(一社) リレーションデザイン研究所代表の [榊原昌彦さん](https://twitter.com/rdlabo) の登壇、Capacitor の話。

2 回目以降のビルドでは差分のみビルドされ本体のバージョンにも常に追随するといった便利な機能も存在。

一方で plugin の充実度で Cordova と比較するとまだまだな部分が多いという話でした。

<a class="link-preview" href="https://capacitor.ionicframework.com/">Capacitor</a>

### Vue と AWSAppSync で始めるチャットアプリ開発

[@is_ryo さん](https://twitter.com/is_ryo) の登壇、GraphQL でチャットアプリを作った話。

Vue + AWS AppSync + Amplify を組み合わせている成果物 (リポジトリは下記参照 URL) で Subscribe が素敵な働きを示してくれる話でした。

<a class="link-preview" href="https://chat.isryo.work/auth">チャットアプリ</a>

<a class="link-preview" href="https://www.slideshare.net/RyosukeIzumi1/vueawsappsync-137300026">Vue と AWSAppSync で始めるチャットアプリ開発</a>

### Nuxt を Lightsail と GAE にデプロイした話

若井豊さんの登壇、Nuxt のデプロイを Lightsail から GAE に変更した話。Koa +TypeScript を API に、SSR して使っている Nuxt アプリ。サーバの初期設定が煩わしくアプリケーションの開発に時間を取ることができなくなって移行を決断。いざ移行すると自動デプロイなど駆使した結果、楽になったということでした。

<a class="link-preview" href="https://slides.com/yutakawakai/deck#/">Nuxt を Lightsail と GAE にデプロイした話</a>

### LambdaでSSRしてみた

フリーランスプログラマ八木大介さんの登壇、AWS Lambda で SSR してみた話。 `vue-server-renderer` を使えば Nuxt を使わなくても SSR ができる。 Vue.js サーバーサイドレンダリング (以下リンクを参照) を確認すればすぐにできそう。カスタムディレクティブがそのままフロントに返されるとエラーになったりと苦労も多かったということでした。

<a class="link-preview" href="https://ssr.vuejs.org/ja/">Vue SSR</a>

### Vue.jsで考えるMVVM

[@44x1carbon さん](https://twitter.com/44x1carbon) の登壇、綺麗なソースコードを書くために必要なことって何だろうと考えアーキテクチャにアプローチした話。まず綺麗なソースコードを書くために、データ設計を今一度見直してみよう。扱うデータをクラス化し、そのクラスに手続き（ロジック）を追加することが重要。ここで挙げられた消費税込価格を算出するという一例は非常に分かりやすかったですね。画面の View で、計算ロジックしていませんか。計算を別管理し描画に集中することでフロントエンドでのテストもし易くなるという話でした。

<a class="link-preview" href="https://speakerdeck.com/44x1carbon/vue-dot-jsdekao-erumvvm">Vue.js で考える MVVM</a>

### @ionic/vueでWebアプリを作ってみる

同じく [v-kansai](https://vuekansai.connpass.com/) オーガナイザーの一人である [@mikakane さん](https://twitter.com/_mikakane) の登壇、 Vue.js と Ionic で Web アプリを作った話。先日の Ionic meetup ではイマイチなリアクション.. 汗だったということで、時を改めてだったようです。とりあえず試すなら、 @modus/ionic-vue (下記リンクを参照) を試すと良いということでした。

<a class="link-preview" href="https://speakerdeck.com/mikakane/vue-de-web-apuriwozuo-tutemiru">@ionic/vue で Web アプリを作ってみる</a>

<a class="link-preview" href="https://github.com/ModusCreateOrg/ionic-vue">@ionic/vue</a>

## 最後に、

次回来月 4/25 に #5 が開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/122664/">v-kansai #5</a>
