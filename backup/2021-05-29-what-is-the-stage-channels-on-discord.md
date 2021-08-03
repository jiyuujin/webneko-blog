---
date: 2021-05-29
title: Discord も続いた音声通話界隈の盛り上がり
description: Clubhouse や Twitter Spaces に続いて Discord の Stage Channels も触ったことを受けて、三者三様ざっくりとした印象を書きました。
slug: what-is-the-stage-channels-on-discord
reaction: 🤙
category: Application
tags: 
 - Discord
 - Clubhouse
---

音声通話界隈で Clubhouse や Twitter Spaces に次ぐ存在として Discord から Stage Channels が新たに登場した。

今年 3 月より多くの場面で使ってきた。

- ミートアップの裏チャンネルにて
- Twitter Spaces をメインに据えて
- ちょっとした会話でも

主にオンライン開催のミートアップを補佐する存在として、双方向のコミュニケーションを実現してくれた。勿論まだまだ入るに堪えない雰囲気もあって、改善の余地があることも痛感している。

音声通話ツールについて三者三様 Web 版として使えるか、ネイティブアプリをインストールしないと使えないかという視点で書いた。

|#|Discord|Clubhouse|Twitter Spaces|
|:---|:---|:---|:---|
|Web Browsers|OK|NG|OK..|
|Native Applications|OK|OK|OK..|

基本的にそれぞれのツール間で大きな差異は無い。 Clubhouse はクローズドな関係性を持っている場合に、また Twitter Spaces はぷらっと入ってお喋りしたい場合に最適な印象がある。

一方でスピーカーやガヤなど役割をしっかり決めて臨みたい場合に Discord を使えば上手くカスタマイズを実現できそうです。

いずれのツールも聞き取りやすい一方、三点リーダーで表現した Twitter Spaces では少し事情が違う。

## 特に Twitter Spaces について

強いて言えば主に 2 点。

- バッテリーに対する異常な負荷
- 円滑な運営が阻害される障害

バッテリーに対する負荷はネイティブアプリ版 Clubhouse にも見られる。

ただそれ以上にネイティブアプリ版 Twitter Spaces のバッテリーに対する負荷は異常だ。この負荷が少し収まれば、一リスナーとして申し分無い。

そして後者のような障害に出会すと曲者で、一度該当者にアプリをキルしてもらうことを勧めなければいけない。 Twitter 社に対し安定した挙動を求めたい。

### Web 版として使いたい

ただ私自身の生息する Web 界隈では Web 版を所望する声が大きいのも事実。

と、想定以上に早く昨日 5 月 28 日から Web ブラウザでも Twitter Spaces へアクセスできるようになった。

![](https://i.imgur.com/N185OHj.png)

ネイティブアプリ版と比べて現時点では参加するのみ、最近スケジューリングできるようになって URL を事前のタイミングで知らせることも可能となった。

とはいえ UI 的に不足する部分も多く現在進行形だったりするのでこれからに期待したい。

- Spaces を立てる
- スピーカーリクエストを送る
- リアクションを取る

## Discord で Stage Channels を作成する

Discord で Stage Channels を作成する際ひと癖あったので今回は詳細に書いておく。

まず適当な名前を付けて Stage Channels を作成する。

![](https://i.imgur.com/katT5tk.jpg)

### 事前にやっておきたいこと

Stage Channels を作成した際やっておきたいのはモデレータの事前指定です。

![](https://i.imgur.com/3DdU79d.jpg)

Discord サーバでは事前にモデレータを指定することで、いちいちスピーカーリクエストを投げてもらう必要がありません。

従って登壇者やスタッフを事前に指定すると良さそうです。

![](https://i.imgur.com/YllyxL4.jpg)

### もう少し理解しておきたいこと

Discord サーバにおける role (役割) は少々複雑。言い換えればそれが複雑な分だけ、よりカスタマイズできるということ。

Stages Channel を運営する際は下記を徹底すると良さそうです。

- 登壇者用 role を準備する
- ガヤ用 role を準備する

各自 `サーバ設定` より role を設定できる。

![](https://i.imgur.com/wB1TA6R.jpg)

メンション先の範囲を指定できたり、スピーカーリクエストを送れたりと多種多様です。

## 最後に

Discord については意識して日常的に使うことで慣れていくしか無さそうです。

いずれのツールを使うにしても喋り相手が欲しいですよね。そこで平日毎朝 09:00 より Twitter Spaces でエンジニア間交流している。

[`#ohayo_engineer` | Twitter](https://twitter.com/search?q=%23ohayo_engineer&src=typed_query)

リスナーからでもご気軽に参加いただければ幸いです。
