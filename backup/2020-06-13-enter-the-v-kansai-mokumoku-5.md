---
date: 2020-06-13
title: V-KANSAI もくもく会 5
description: 先月に引き続き今回もオンラインもくもく会でしたが、CSS moduleやviteを中心に知見の共有もなされ大変有意義な会となりました。
slug: enter-the-v-kansai-mokumoku-5
reaction: 5️⃣
category: 
tags: 
 - Review
---

## はじめに

先月に引き続き今回もオンラインで開催となった v-kansai もくもく会 #5 の振り返りを、 Keep / Problem / Try の観点で簡単に振り返ってみます。

## Keep : 良かったこと / 今後も続けたいこと

遅ればせながら、Lint を導入している全リポジトリに対して ESLint v7 / @typescript-eslint v3 更新を進めました。

:::message is-primary
それぞれ詳しい部分は以下、公式リリースノートをご確認ください。

https://eslint.org/blog/2020/02/whats-coming-in-eslint-7.0.0

掻い摘んで気になった点を中心に書くと。

#### ESLint v7
1. Dropping support for Node.js `v8.x`
2. instead use `eslint-plugin-node`
- callback-return
- global-require
- handle-callback-err
- no-buffer-constructor
- no-mixed-requires
- no-new-require
- no-パス-concat
- no-process-env
- no-process-exit
- no-restricted-modules

3. use with `--config` or `--ignore-path`

#### @typescript-eslint
1. Dropped support for Node version 8

2. Dropped support for TypeScript 3.2

3. configs
```js
 extends: [
   "recommended",
-  "plugin:@typescript-eslint/eslint-recommended",
   "plugin:@typescript-eslint/recommended"
 ]
```
:::

この Lint プラグイン更新と同時に、目下進めている自身の管理画面の Vue3.0 対応から、コンポーネント刷新まで幅広い作業を進めました。

今回もオンラインで知見を共有し合えたこと。

前日に開催された remote.vue #1 での共有が多数を占めました。私も遅ればせながら BGM 感覚で動画配信を確認させていただきました。

オフライン開催後の懇親会同様おのおの感じることを認識・共有する機会を持てたのは大変良かったです。

## Problem : 上手く行かなかったこと

イベント運営上参加率が芳しくなかったこと。もちろん予定通り参加された方は問題無いのですが、それ以外の方はどうなんでしょう。

また、決まって喋って共有する人間に偏りが出てしまっていたこと。

オフライン開催であればこちらからお声がけすれば良いのですが、この辺り前回以上に悩ましい結果となりました。

## Try : 今後実施すること

粛々と自身の作業を進めて、プロダクトを高みに持って行きたい。

## 最後に、

次回のもくもく会 #6 の予定は現在未定ですが、早ければ来月にもやりたいと思っています。
