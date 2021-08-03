---
date: 2019-01-30
title: コンシューマ向けSPA開発から得られた知見
description: 東京で初めて登壇させていただきました、なめすたの知見を凝縮です。ちなみに半年以上ぶりに、振り返らせていただいてます。
slug: some-knowledges-in-namesta-spa
reaction: 🔮
category: Front
tags: 
 - Laravel
---

この度 SCOUTER に転職します。これまで 4 年近く(結構長く)在籍させていただいたポノス株式会社でのお仕事をざっと共有させていただきます。

## 一般的な SPA 構成

2 年ほどの開発・運用を経て最終的に停止判断がなされてしまいましたが、管理画面並びにゲーム内のアプリ内ブラウザ等で Laravel を導入しています。

<a class="link-preview" href="https://namesta.net/">なめすた</a>

### 使えなくなった vue-strap

パッケージ選定は非常に悩みます。とくに DatePicker で採用、上記の事象が発生して Babel を導入も laravel-mix を更新するも動作しません。メンテ終了となってしまったようで、一時しのぎとして vue2-datepicker を使うよう変更。めぼしいプラグインも見当たらないので、後に自作しています。

<a class="link-preview" href="https://github.com/yuche/vue-strap#deprecated">vue-strap deprecated</a>

### SPAにとり非同期通信は肝

フレームワークの類(Vue CLI や Nuxt 等)を一切使っておらず、webpack を一から構築しました。今となっては当然のことですが、非同期通信を利用したくまずは新しい ES 規格を使えるようにするため Babel を導入します。

```bash
yarn add babel-core -D
yarn add babel-plugin-transform-runtime -D
yarn add babel-polyfill -D
yarn add babel-preset-env -D
yarn add babel-preset-es2015 -D
yarn add babel-preset-stage-3 -D
```

以下の通り設定します。

```.babelrc
{
  "presets": [
    "env",
    "stage-3"
  ],
  "plugins": [
    [
      "transform-runtime",
      {
        "polyfill": false,
        "regenerator": true
      }
    ]
  ]
}
```

最低限エンドポイントを叩く際は `async/await` 単発の場合は、これで充分かと。一方でガチャを扱うページでは複数のエンドポイントを叩く必要があり `Promise.all` 便利ってことに気付かされた。

ちなみにゲーム会社らしくディレクトリ構成はページ単位で行っている。

Atomic Design を採用していません。

```
components
+- app_notifications
+- browser_notifications
+- gacha_info
+- privacy_policy
+- legal
..
```

通信処理を各コンポーネントで行うことをせず、予め services ディレクトリに切り直すことをオススメする。

細かく言うと以下のように services のインスタンスを作って通信処理専用メソッドを叩けば良さそうです。

```ts
async fetch() {
    let apiService = new ApiService()
    const contractTagsData = await apiService.fetch()
}
```

エンドポイントのレスポンスを確認するユニットテストで、この分離が後々楽にさせてくれる。
