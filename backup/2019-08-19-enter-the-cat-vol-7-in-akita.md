---
date: 2019-08-19
title: CaT vol7 リポート
description: 遥々遠く離れた秋田の地に、全国各地から Vue使いが集まります。
slug: enter-the-cat-vol-7-in-akita
reaction: 😻
category: 
tags: 
 - Review
---

## 遥々遠く離れた秋田にて

直前に颱風が差し迫り一時開催できなくなるのではと思いましたが、無事に開催でき良かったです。

秋田県内の参加が 30 名近くと最も多かったようですが一方で県外の参加者、北は北海道から南は沖縄まで、満遍なくいらっしゃる会となりました。

<a class="link-preview" href="https://create-and-think.doorkeeper.jp/events/90155">CaT vol.7</a>

![](https://i.imgur.com/IXpBXii.jpg)

### 途中にヨガでリラックス

アツイ登壇セッションが続く中、良い気分転換になりました。

Vue ポーズなるものがあったんですね。

![](https://i.imgur.com/Fv3iSuq.jpg)

コモモ先生、ありがとうございました。

こちらは necco ナツイ ヒトミさんのツイートより拝借しております。

### 私自身も喋らせていただきました

関西以外では先日の Nuxt Meetup 以来 2 度目、プロダクトの品質担保に欠かせないテストについて。

テストの観点がわかりづらい人たちの一助になればと考えています。

<a class="link-preview" href="https://slides.com/jiyuujin/20190817">Vue CLI テスト Tips 集</a>

## ざっと総括します

今回の参加者層として、Vue/Nuxt の未経験層が意外と多かったです。これからやってみようかなと考えている人たち向けのセッションも多く、また実務面も然りといった印象で総じて満足度は高いでしょうか。

1. Note 移行話、その後
2. サーバレス関連
3. 基礎も侮れない

### 注目のセッションを中心に、

まずは何と言っても株式会社ピースオブケイク福井烈さんから、去年の Vue Fes Japan の続編。記事詳細ページやクリエーターTOP ページの Nuxt 移行が既に完了していること。これらの移行に当たって出会した課題や、またパフォーマンス面で Functional Component を積極的に取り入れるなど、想定以上に地道だったと感じました。

<a class="link-preview" href="https://note.mu/r82/n/nbbe6af25b825">note を Nuxt.js で再構築した話-2nd-というタイトルでお話してきました</a>

### 流行りはサーバレス

necco 森下裕介さんから読み取った QR コードと kintone の間でデータ連携を取るアプリについて。 Gateway + Lambda を経由して、API を叩くというもの。ログイン認証には Firebase Auth を用いている点が特徴でした。

<a class="link-preview" href="https://speakerdeck.com/yusukemorishita/developed-point-card-system-with-vue-dot-js-plus-kintone">ポイントカードシステムを Vue.js + kintone で開発した話</a>

続いて Re:build 鈴木孝之さんから、 Laravel に Realtime DB を用いたチャット機能について。 Laravel と Firebase で二重に認証しているがバグが多く煩雑になっていること。まだまだ改善の余地はありそうと言う話でした。

<a class="link-preview" href="https://speakerdeck.com/bumptakayuki/nuxt-dot-jstofirebasederiarutaimutiyatutoapuriwokai-fa-sitahua">Nuxt.js と Firebase でリアルタイムチャットアプリ開発した話</a>

アイレット株式会社インフラエンジニアの若松剛志さんから SSR を選択した場合に問われるインフラの知識について。

API Gateway + Lambda を利用することで簡単にサーバレスを実現できるという話でした。

<a class="link-preview" href="https://speakerdeck.com/wkm2/inhurakarajian-ruvue-dot-js">インフラから見る Vue.js</a>

### 基礎も侮れない

HAMWORKS 長谷川広武さんから、Vue.js の特徴のひとつとも言えるディレクティブな表現を始め初心者向けの紹介を中心に話されました。

これから始めてみたい方は以下動画をチェックすると良さそうです。

<a class="link-preview" href="https://www.youtube.com/playlist?list=PLh6V6_7fbbo-SZYHHBVFstU2tp0dDZMAW">Vue.js 入門</a>

### その他

実務レベルでは HAMWORKS 占部紘さんから失敗談を中心に話されましたが、フロント・サーバの役割をいま一度考えさせられます。そして Vuex を含めたコンポーネント設計が本当に大事であることを痛感させられました。

<a class="link-preview" href="https://speakerdeck.com/torounit/cat-vol-dot-7">Nuxt は簡単に SPA 作れるけど、アプリケーションが簡単に作れると思ったら大間違いだった</a>

同じく実務レベルのアニメーションを披露いただいた丹野翔太 (たんしお) さんから深く突き詰めると奥の深いアニメーションの世界。その中でもキモは Scope 付 slot を上手く駆使すれば良さそうです。

(資料公開をお待ちください)

今後知見の増えるジャンルは中途案件ではないでしょうか、ということで カマダ ダイスケ (Qtaro) さんから [ぴよたそ](https://hiyokoyarou.com/) に Vue を部分導入した話について。

<a class="link-preview" href="https://www.slideshare.net/daisukekamada1/cat-vol7-vuejs-ltvuejscatvol7-164544912">ひよこでも始められる Vue.js</a>

## 最後に

東京や大阪と違って非常にこぢんまりとしていたのがミソだと感じました。交流範囲が限られることも無く、より突っ込んで交流できる良さを実感しました。

また秋田 (もしくは青森など) で開催されることがありましたら、是非伺いたいですね。
