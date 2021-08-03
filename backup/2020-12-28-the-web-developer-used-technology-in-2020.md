---
date: 2020-12-28
title: Webデベロッパとして2020年に使った技術スタック
description: 2020年の最後に、この「コロナ禍」な一年間を振り返る。
slug: the-web-developer-used-technology-in-2020
reaction: 🔍
category: 
tags: 
 - Review
---

2020 年最後のポスト。

## 立場

主に Cake/AWS を使用しているサービスの運用・開発に、一フロントエンドエンジニアとして関わらせていただくと共に、個人としてもいくつかプロダクト製作を進めている。

そうした前提の下で一年間の KPT、利用した技術一覧を見ていく。

### Keep : 良かったこと / 今後も続けたいこと

- ユーザビリティ・アクセシビティを考えた UI コンポーネントのリプレース
- フロントエンド環境刷新、属人化解消
- ブログ 26 件 (技術記事 8 件、Scrap 投稿 2 件、個人・イベント振り返り 16 件)
- 登壇 4 件 (オフライン 1 件、オンライン 3 件)
- オンライン運営を中心に知見が集まった
- 個人用 org を作った

### Problem : 上手く行かなかったこと

- 自身のメインプロジェクト (Cake) でリプレースが落ち着いてしまった
- ブログの年間技術投稿が 8 件と少なかった
- 登壇駆動開発と称し登壇時にのみ投稿するよう限った
- v-kansai の活動が事実上停止してしまった
- Twitter アカウントにログインできなくなってしまった

最後だけ自身の手違いだが、いずれも COVID19 を一因に言える。

来年も同じような理由で上手く行きませんでした、というのでは少々惨めないので、ここはひとつ打開したい。

### Try : 今後実施すること

- 当ブログに Scrap 的なもの (Zenn のようなやつ) を導入する
- アクセシビリティについての学習を進める
- モノレポ開発、Yarn ワークスペースについての知見を深める

Scrap 機能はベータ利用という位置付けで当ブログに導入済。これまでのブログほどの内容では無いけれど、ちょっとしたことを記録するのに活用していきたい。

## 利用した技術一覧

![2-most-commit-language-2020](//images.ctfassets.net/gzkue3szf85p/6fvnfThkQnqhM19qQMpZPv/fde5324d4146b1c2d4634312fb0c25d5/2-most-commit-language-2020.png)

これは [GitHub Profile Summary Cards](https://github.com/vn7n24fzkq/github-profile-summary-cards-example) という便利ツールを使わせてもらい自動生成している。自身の Github アカウント内のみ、他 Gitlab を使っているプロジェクト等あったが、この自動生成分には含まれていない。

主軸としては TypeScript/React/AWS の辺りでした。おしごとの場面では React を使うことが増え Vue 以上に触る機会が多くなりました。

フロントエンド環境の刷新から運用効率化の一端を担うツール製作まで、幅広くかつ手堅く動いていた。

**太字** は特記事項があるものです。

- Language
   - Node.js
   - **TypeScript**
   - JavaScript
   - Rust
   - Scala
   - PHP
- Framework
   - Express
   - Nest.js
   - **React**
   - Next.js
   - Gatsby.js
   - **Vue**
   - Nuxt.js
   - VuePress
   - Vite
   - Laravel
   - Cake
- Middleware / Infrastructure
   - Docker
   - AWS
      - EC2
      - Fargate
      - ECS
      - Lambda
      - Cloudfront
      - S3
      - Cloudwatch
      - AppSync
   - GCP
      - Cloud APIs
      - AppEngine
      - Cloud Run
   - Firestore
   - Google Apps Script
   - Static Site Hosting
      - Vercel
      - Netlify
      - Amplify Console
   - Authentication
      - Firebase Authentication
      - Auth0
   - Payment
      - Stripe
- CI
   - Github Actions
   - Circle CI
   - Travis CI
- Editor
   - IntelliJ IDEA
   - VSCode
   - Vim

## 特記事項

### TypeScript

プライベートに限っては型を無視して JavaScript で書くこともあったが、ちょっとしたツール製作を含めても、大体 TypeScript で書いていた。

スプレッドシートでイシューを管理しているため Google Apps Script を使って効率化を図る場面が増えた。また GCP AppEngine や CloudRun を組み合わせてトリガー実行する場面も多く存在、お金もかからないのでとても重宝していたり、と Google 様々。

### React

昨年は Vue CLI をベースに MPA 環境の構築を進めたが、これとは全くの別プロジェクトながら同じような MPA 環境の構築を進めている。単なる描画に留まらずユーザの意向をサーバサイドに反映する、SPA としての双方向性の実現に寄与した。

また多言語化の一環で、Hooks で書くことを基本にしたプラグインであることを理由に react-i18next を選定し、その導入を進めた。

最後にコンポーネント集 (現時点では仮) の製作を開始。プロダクトに組み込まれたもの、そうではないものにはっきりと二分されたが、こればかりフロントエンドをやっている身が実質私のみ、というプロジェクトにおいてやるせない気持ちも然り。フロントエンド技術の標準化に時間を当てられたのはこうしたプロジェクトにとって大変意義深いことだと感じている。

### Vue

去年夏より進めていた UI コンポーネントのリプレースも、現在は落ち着いた状況になっている。

Vue 3 対応について、既に納品を済ませたものについて Vue 3 に上げることは無い (上げる予定も無い)

逆にいうとそれ以外について Vue 3 で開発する、あるいは Vue 2 で Options API を基本に書きいつでも Vue 3 に上げられるよう準備を進めた。

### AWS

ECS を利用する場面が増え、コンテナ技術が当たり前のように広がっているのを実感させられた。

まずは Docker 運用、それを取り入れないという選択肢自体あり得ない。

GraphQL API 開発を容易にする AppSync を利用する場面も増えた。

関連する技術投稿がこの一年間ひとつも無かったが、来年何かの機会で投稿できれば。

## 最後に

去年以上にプラグインを自作することが多かった一年。

無ければ自分たちでおのおのプラグインを作るのをモットーに、プラグインやコンポーネントを自作してきた。

npm プラグインとして外部公開に踏み切らなかったプラグインから。

```json
{
  "dependencies": {
    "@nekohack/<PLUGIN_NAME>": "git+ssh://git@github.com/nekohack/<PLUGIN_NAME>.git",
  },
}
```

汎用性を持たせ外部公開に踏み切ったプラグインまで。

- vue-datetimerange-picker
- vue-single-picker

様々合った。

このようなフロントエンド技術に加え、インフラサイドへどのようにスケールアップさせるか、という視点を付加したことで素養の広さも兼ね備えた。

来年以降、フロントエンド技術を磨くのはもちろん「特定のフレームワークにとらわれず」新たな知見を生み出したい。
