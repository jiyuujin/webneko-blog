---
date: 2019-05-09
title: 初めまして、関西Node学園
description: 初めて関西 Node学園 #6 (#kng6) に参加させていただきました。
slug: enter-the-kng6-in-osaka
reaction: 💙
category: 
tags: 
 - TypeScript
 - NodeJS
 - Review
---

今まで個人的な都合により参加できずでしたが、今宵初めて関西 Node 学園 #6 (#kng6) に参加させていただきました。

## Node.js v12

関西 Node 学園オーガナイザ [@shisama](https://twitter.com/shisama) さんの登壇、発表内容を事前に共有いただいてました。

<a class="link-preview" href="https://shisama.hatenablog.com/entry/2019/05/08/070000">Node.js v12</a>

v12 になり掻い摘んで気になったことを中心に紹介がなされました。 JS エンジン V8 のアップデートで新機能が追加されました。 async/await が promise と比較して高速化。 ES2015 で導入されたクラス構文で `#` から始まるプライベートフィールドが使えるようになっています。内容はあまりに濃厚過ぎて続きは [Webで](https://shisama.hatenablog.com/entry/2019/04/24/103000) チェックしておきましょう。

<a class="link-preview" href="https://shisama.hatenablog.com/entry/2019/04/24/103000">Node.js v12</a>

## 半年がかりでNode.jsにコミットして得たもの	

https://speakerdeck.com/koh110/nodejs-commit

Yahoo!株式会社の [@koh110](https://twitter.com/koh110) さんの登壇で東京から日帰りのご参加、バグ修正を通してコミットまで到達した経験談について話されました。今回は maxBuffer の説明に難航、また意外とアクティブではないコラボレータ界隈、 CI を回すことすら一苦労だったようです。

マルチプラットフォーム (libuv) 対応はとにかく大変。結論は Windows で `listen(0)` につまづいたこと。こうして得られた結果、語学力よりソースコードを信じたことが Approve への一番の近道だったので参考になれば幸いです。

## eslintでtypescript

つい先日 eslint チームが TypeScript サポートに本気を出す宣言をされました。

ng-kyoto 運営の [sayanaka (@zilch8)](https://twitter.com/zilch8) さんから。

`@typescript-eslint/eslint-plugin` と [ルール対応表](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md) を使って TSLint からの乗り換えを絡めた話。

最低限のルールを記載したプロジェクトで TSLint から置き換えた所感としては大変だったようです。

<a class="link-preview" href="https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md">eslint で typescript</a>

## Node.jsサーバアプリケーションの稼働方法 ~ 基本から Dockerまで

株式会社ビーツリー (BTree) の [@akkun_choi](https://twitter.com/akkun_choi) さんから。

プロセスマネージャ (今回は PM2 を中心に) と Docker を使って Web サーバの構築を比較しながら話されました。

基本的に PM2 を使いたい場合は、[リンク](http://pm2.keymetrics.io/docs/usage/startup/) を参照すると良さそう。サーバ運用を考える上で基本的に PM2 はだいたい解決してくれる。

```bash
# PM2
pm2 start app.js
```

最後に AWS ECS/Docker と Node.js の相性の良い関係性から、 AWS Fargate の話。

<a class="link-preview" href="https://speakerdeck.com/akkunchoi/node-dot-jssahaahurikesiyonfalse-jia-dong-fang-fa-ji-ben-karadockermate">Node.js サーバアプリケーションの稼働方法 ~ 基本から Docker まで</a>

## tsx を JavaScript で綺麗に構文強調したい + おまけ	

HAL 大阪に通っている [@mochiya98](https://twitter.com/mochiya98) さんの登壇、　TypeScript に対応できていないライブラリ (highlight.js など) で構文強調した話。

VSCode の Web エディタに [Monaco Editor](https://microsoft.github.io/monaco-editor/index.html) が存在していたのは初耳。

<a class="link-preview" href="https://microsoft.github.io/monaco-editor/index.html">Monaco Editor</a>

しっくり来るのが無く standalone-monarch という名前で自作したものの、結局 VSCode の中の人が作っている [shiki](https://github.com/octref/shiki) を使えば良いことが後から判明。

そもそも正規表現ライブラリ Oniguruma が C で書かれており Web では使えない、 VSCode では使えない訳はこのことだったようです。

<a class="link-preview" href="https://github.com/octref/shiki">octref/shiki</a>

### おまけは、 Preactを導入した話

React DOM だけでバンドルサイズが 100MB 超。この大きさを理由として Preact に移行した話。

実際に [イベント箱](https://m98.be/event-box/#/) で使っているそうです。

<a class="link-preview" href="https://m98.be/event-box/#/">おまけは、 Preact を導入した話</a>

## 便利で危ない npm install

[増満光 (@dos_pg)](https://twitter.com/dos_pg) さんの登壇、 Node.js は OS への操作が可能で実はセキュリティの観点から危険という話。

<a class="link-preview" href="https://qiita.com/mysticatea/items/aac027f9183ea9f0f9b1">便利で危ない npm install</a>

## 最後に

Node.js 繋がりでもう一言。

この度、自ら kansai.ts を立ち上げました。 6/10 (月)に #1 をグローバルベンチャーハビタット大阪（GVH Osaka）様にて開催します。

<a class="link-preview" href="https://kansaits.connpass.com/event/130120/">kansai.ts #1</a>
