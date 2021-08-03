---
date: 2019-06-10
title: KANSAI.TS 初開催です
description: 令和明けてふと個人的にやりたいと思ったことをまた一つ実現しました。今後 TypeScriptでもゆるふわ交流できれば、と考えております。
slug: enter-the-kansai-ts-1-in-osaka
reaction: 💪
category: 
tags: 
 - TypeScript
 - AWS
 - Review
---

## 関西で、いいえ日本で初開催でした。

東京でも来週に開催、抽選倍率が大変なことになっていますが、奇しくも東京より先んじて開催することになっていました。

自身がやりたいと言った 3 日後には既にイベントぺーじを公開する運びとなっています。

LT 枠に空きが出たら私も喋りたいなと思いましたが、今回はその必要が無かったようです。

### GVH Osaka (グローバルベンチャーハビタット大阪) にて

無事初回を終えることができました。

セッション終わりに、記念撮影もさせていただきました。

![](https://i.imgur.com/LPNYYNw.jpg)

※ ちなみに GVH Osaka で何らかのイベントを開催・共催したい場合は以下よりできますので良ければご利用ください。

<a class="link-preview" href="https://docs.google.com/forms/d/e/1FAIpQLSeHMSQNITHlffLMcO6yeg86xLYo-6Z6QlKVExyGlnQoFMeWgw/viewform">イベント依頼フォーム</a>

## Advanced built-in types

関西 Node 学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、色々な型定義のご紹介がありました。 readonly は認識していましたが、まだまだこれからと言った型定義もあり、深く見ていく必要がありそうです。

- Partial
- Required
- ReadOnly
- Pick
- Record
- Exclude
- Extract
- NonNullable
- Parameters

<a class="link-preview" href="https://speakerdeck.com/masashi/number-kansaits-1">Advanced built-in types</a>

## AWS CDK for TypeScriptを紹介するぜ

KYOSO 株式会社 [@is_ryo](https://twitter.com/is_ryo) さんの登壇、構成管理で Cloud Formation のテンプレートを生成できる AWS-CDK を TypeScript で書く話。

ただし、現状 beta でありプロダクションとして使うには時期尚早、突然の仕様変更もありうるため気を付けるべき。

<a class="link-preview" href="https://master.d1r9qwzhk27es2.amplifyapp.com/">AWS CDK for TypeScript を紹介するぜ</a>

## ざっくり AssemblyScript

[丸末 皓太 (@mrsekut)](https://twitter.com/mrsekut) さんの登壇、フロント・バック共に TypeScript で実現できる AssemblyScript について。

一部 Rust より速かったり、 C よりファイルサイズが小さく済んだりするらしいですが、基本的にビルドすると .ts から .wat/.wasm を生成する仕組みで動作。

[サンプル](https://github.com/mrsekut/simple-assemblyscript-sample) を参考にさせていただきたいです。

<a class="link-preview" href="https://scrapbox.io/mrsekut-p/%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8AAssemblyScript">ざっくり AssemblyScript</a>

## Alexaスキル開発で始めるTypeScript

株式会社デジタルキューブ Hide Okamoto さんの登壇、 Alexa スキル開発を TypeScript で始める話。

gulpfile などタスクランナーを除いてほぼ 100％ TypeScript 製のフレームワークであること、Input/Output で型の恩恵を受けられる。

音声から文字を認識、 Lambda で JSON を受け取って JSON を返す仕組みも単純明快な印象。

設計周りは [ask-sdkの設計を覗き見る](https://qiita.com/shinichi-takahashi/items/7191d3d393e08b2746f0) を見ると良さそうです。

<a class="link-preview" href="https://speakerdeck.com/hideokamoto/kansaits01">Alexa スキル開発で始める TypeScript</a>

## Cognitive Complexityでコードの複雑さを定量的に計測しよう

[@s2terminal](https://twitter.com/s2terminal)さんの登壇、 [Code climate](https://codeclimate.com/)で定量的に計測できる話。

ネストが深かければ深いほど人間にとって理解することは難しいレベル、この観点を Cognitive Complexity と呼ぶことを知りました。

Docker で動作する [サンプル](https://github.com/s2terminal/cognitive-complexity-example) を作ったそうです。

`docker-compose run --rm analyze` コマンドを叩くことで簡単に計測できるので一度試してみたいです。

<a class="link-preview" href="https://www.slideshare.net/ShutoSuzuki/cognitive-complexity-149117241">Cognitive Complexity でコードの複雑さを定量的に計測しよう</a>

## 【VSCode Remote】10秒でNuxt環境を構築【脱WebStorm】

[@salamander_jp](https://twitter.com/salamander_jp) さんの登壇、VSCode の拡張機能について。

vscode-remote-try-nuxt リポジトリをクローンし VSCode を開く。

[Reopen in Container] をクリックすることによりコンテナ内で開発できるそうです。

<a class="link-preview" href="https://qiita.com/relu/items/defde8de8c4d21af662f">VSCode Remote】10 秒で Nuxt 環境を構築【脱 WebStorm】</a>

## TypeScirptでAPIの受け入れテストを記述

株式会社 chatbox 代表取締役 [後藤知宏 (@mikakane)](https://twitter.com/_mikakane)さんの登壇。

REST API を使う場面で TypeScript を部分的に導入した話について。

TypeScript を導入するには一から型定義する必要がある。しかしデザイナーの多いプロジェクトなどで [io-ts](https://github.com/gcanti/io-ts) を使うと都合が良いそうです。

## 最後に

次回 kansai.ts #2 は 9 月上旬開催予定 (7 月上旬にイベントページを公開・募集開始予定)

参加枠、LT 枠共に今回よりも増やして準備しています。

また kansai.ts 用のコミュニティを discord で作りました (どんな感じで進めるかは全く想定外ですが)

<a class="link-preview" href="https://discord.gg/AJPs2Uh">kansai.ts discord</a>
