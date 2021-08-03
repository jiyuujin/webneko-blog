---
date: 2019-04-25
title: 平成最後の V-KANSAI を開催しました
description: 平成最後の v-kansaiとなりました！ 今回のスポンサー LINE Kyotoさま、ご協力ありがとうございます。
slug: enter-the-final-v-kansai-of-the-heisei-period
reaction: 5️⃣
category: 
tags: 
 - Vue
 - Review
---

前日 4/24 には東京でも開催された Vue.js Meetup、結果としてたまたまタイミングのカブること無くセッティングできたことは嬉しい限りです。

## Put Your Hands Up

今回利用させていただいたサービス、登壇者に質問することを目的にしたサービス「Put Your Hands Up」

<a class="link-preview" href="https://pyhu.nkgr.app/">https://pyhu.nkgr.app/</a>

[Nokogiri](https://twitter.com/nkgrnkgr) さんから今回は個別に v-kansai #5 専用ページまで用意していただきました。

https://pyhu.nkgr.app/events/badb6c63-1194-4993-99f7-10f3d932ccae/http://

とはいえ、上記リンクよりご覧になれますので、是非チェックのほどお願いします。

## スポンサーである LINE さまのLT

LINE 株式会社 [@tech_many](https://twitter.com/tech_many) さんの登壇、 CSS 設計手法でコンポーネント設計した話。

きっかけは Atomic Design で満足できず、今回 [FLOCSS](https://github.com/hiloki/flocss) をやってみた。

Vue CLI v3 のディレクトリに追加して対応したことでとりあえずは解決、ただしサンプル数がまだまだ少ないと言ったことが課題のひとつのようです。

<a class="link-preview" href="https://speakerdeck.com/tech_many/cssshe-ji-shou-fa-dekonponentoshe-ji-sitahua">https://speakerdeck.com/tech_many/cssshe-ji-shou-fa-dekonponentoshe-ji-sitahua</a>

<a class="link-preview" href="https://github.com/hiloki/flocss">FLOCSS</a>

## TypeScript でテストを始めた

[ユカイ](https://twitter.com/syukai) さんの登壇、 TypeScript 導入から Jest でテストを書いた話。まず TypeScript 導入について tslint を採用したようです。個人的に今となっては @typescript-eslint を採用した方が良いのではと思いました。まぁそれだけ Web 界隈の進むスピードが早いことを実感させられますね。

<a class="link-preview" href="https://speakerdeck.com/syukai/typescripttotesutowohazimeta">TypeScript でテストを始めた</a>

続いてテスト。中身は Ruby のようですが、「[初めての自動テスト](https://www.amazon.co.jp/%E5%88%9D%E3%82%81%E3%81%A6%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88-%E2%80%95Web%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88%E5%9F%BA%E7%A4%8E-Jonathan-Rasmusson/dp/4873118166)」がテストを書く上で凄く参考になったようです。

<a class="link-preview" href="https://www.amazon.co.jp/%E5%88%9D%E3%82%81%E3%81%A6%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88-%E2%80%95Web%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E8%87%AA%E5%8B%95%E3%83%86%E3%82%B9%E3%83%88%E5%9F%BA%E7%A4%8E-Jonathan-Rasmusson/dp/4873118166">TypeScript でテストを始めた</a>

下記のことに気をつけながら、何のテストを書いているかを明確にしたようです。

1. テストケース `it` ひとつに対し、テストケースをひとつにすること
2. API の呼び出しを独立にすること
3. コンポーネントを出来るだけ小さくすること

## Nuxt.jsと Expressで Webサービスを作ってみた

[だら](https://twitter.com/dala00) さんの登壇、「[100の質問メーカー](https://questions.appllis.net/)」を Nuxt.js + Express で作っている話。

<a class="link-preview" href="https://questions.appllis.net/">Nuxt.js と Express で Web サービスを作ってみた</a>

新規 Nuxt プロジェクトのスタートアップで `create-nuxt-app` ではサーバの選択肢が与えられ、凄く使い勝手が良かった。また今後データの集計機能も盛り込む予定があったので、 NoSQL と違ってしっかりと設計できる MySQL を採用。フロント、サーバ共に Node.js を使う選択肢を取ることとなった。

ただしフロント・サーバ共に組み合わせるパッケージで動かない事象が度々発生。デプロイ先である GAE でも一番貧弱なサーバを選択したこともこの原因と考えられるとのこと。

結果としてサーバは専用のフレームワークを採用した方が無難だったそうです。

<a class="link-preview" href="https://speakerdeck.com/dala00/nuxt-dot-jstoexpressdewebsabisuwozuo-tutemita">Nuxt.js と Express で Web サービスを作ってみた</a>

## amp-script + Vue.js

関西 Node 学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、先週の AMP Conf 2019 でも話題になった amp-script の話について。

`AMP-Access-Control-Allow-Source-Origin` などを追加した上で公式の [サンプル](https://github.com/ampproject/amphtml) を使うことができる。

一部申請のあったオリジンに対しては、既に AMP が使える状態となっているようです。とはいえ JS が使えないってどーなのよ、ファイルサイズに制限があったりという話もあるようで。これからに期待したいです。

<a class="link-preview" href="https://amp.dev/ja/events/amp-conf-2019">AMP Conf 2019</a>

<a class="link-preview" href="https://speakerdeck.com/masashi/number-v-kansai-5">amp-script + Vue.js</a>

## その他 LT セッション

### Vue.js の Reactive の中をのぞいてみた件

atma 株式会社の [morifuji](https://twitter.com/maroon88) さんの登壇。

Vue.js でしばしば object にプロパティを追加したのに反映されていないと言ったことにハマるのは Reactive に振り回されているから起因している話について。

実際に Vue.js の作者である Evan 氏の [リポジトリ](https://github.com/vuejs/vue/tree/dev/examples/todomvc) でステップ実行してみた経験から話されました。

<a class="link-preview" href="https://github.com/vuejs/vue/tree/dev/examples/todomvc">ToDo MVC</a>

<a class="link-preview" href="https://speakerdeck.com/diggymo/vue-dot-jsfalsereactivefalsezhong-wofalsezoitemitajian-35149316-f2b0-4ee3-91f3-fff6d272f129">Vue.js の Reactive の中をのぞいてみた件</a>

### iOSで Vueを書き JAMStackな LT資料を作った話

[んじゃみ](https://twitter.co179jp) さんの登壇、目立ちたい一心から iPad でプレゼンテーションスライドを作った話。しかも縦型で魅せる形式でした。

このスタイルを実現するに当たって外付キーボードに問題、一部キーで入力できないことがあるようです。また　iOS12.2 以降、 PWA 周りが更新されておりこの対応を進めたことで、結果としてネイティブアプリと同じ挙動になったという話でした。

### 初心者の Vue.js奮闘記録

インフォニック株式会社の山下大輔さんの登壇、 Vue.js を使ってプロフィールページを作った話。

レスポンシブ化まではされていないようですが、 [Webサイト](https://portfolio-of-daisuke.firebaseapp.com/#/) の出来は素晴らしいですね。

<a class="link-preview" href="https://portfolio-of-daisuke.firebaseapp.com/#/">プロフィールページ</a>

困ったことは webpack 周りの設定ファイルが隠蔽されていたので少し分かりづらかったこと。 eslint による制限が厳しかったので全て無視してしまったこと、初めてビルドすると意外とその対応が辛かったりしますね。また今後テストコードをちゃんと書いていきたい、vuex も活用していきたいと言った話でした。

<a class="link-preview" href="https://speakerdeck.com/libra189/vuebeginner">初心者の Vue.js 奮闘記録</a>

## 最後に、

次回来月 5/22 に #6 が開催予定です。

<a class="link-preview" href="https://vuekansai.connpass.com/event/122664/">v-kansai #6</a>
