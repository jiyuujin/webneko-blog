---
date: 2021-06-10
title: lit-element を使った簡易 PWA アプリ
description: これまでと趣向を変えて LitElement の話。手元で現在の日付並びにその週が見てとれる簡易 PWA アプリを製作しました。
slug: progressive-web-app-on-lit-element
reaction: ⏰
category: Front
tags: 
 - LitElement
 - PWA
 - TypeScript
---

今回、私が作ったのはカレンダー Web アプリ。

![](https://i.imgur.com/zjCCGCF.jpg)

Web サイトはこちら。

[https://calendar.nekohack.me](https://calendar.nekohack.me)

最低限の機能要件として、主に 2 点列挙した。

- 画面横向きならではの描画を設定する
- ホーム画面に追加する

各自アクセスいただいて iOS または Android デバイスにおける画面縦向きのロックを `OFF` にすると、画面横向きでもそれに合わせて描画されていれば良い。

そして後者のホーム画面追加対応は PWA が設定されていることを確認できれば良い。

## Lit を書いて WebComponent として使う

そもそも WebComponent はフレームワークに依存せず Web 標準の技術で再利用可能なコンポーネントを製作できる。実際に WebComponent を作るには下記 3 つの選択肢からひとつ選択すれば良い。

- 外部ライブラリを何も使わずに実装する
- lit-html を使用して実装する
- lit-element を使用して実装する

今回は lit-element を使ったが、それはフロントエンドの中でもこれまでに触れなかった分野のひとつ。

Google が推進する Polymer Project のひとつで、容易に WebComponent を作れる。設計上 Shadow DOM になっており外からの影響を全く受けることは無い。

[Getting Started | LitElement](https://lit-element.polymer-project.org/guide/start)

PolymerElement と lit-element の違いを中心に書かれており大変参考になった。

[PolymerElement is dead, long live LitElement! | dev.to](https://dev.to/julcasans/polymerelement-is-dead-long-live-litelement-5f45)

::: message is-primary

下記リポジトリを参考にした。

基本的に ts-loader を通せばコンパイルできる。

[marcushellberg/lit-element-form-example](https://github.com/marcushellberg/lit-element-form-example)

:::

### モジュールバンドルに webpack を使う

webpack.config.js を書くが lit-element だからといって特段変わったことは無い。

```ts
module.exports = ({ mode }) => {
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
}
```

ts-loader を読み込むことでコンパイル可能。

ただし ES5 向けのビルドは提供されておらず class 構文に非対応の IE11 に対応するため、別途 Babel を通す必要がある点に注意 (下の方 IE 対応をチェック)

### lit-element の記法について

`customElements.define` と property くらい。

```ts
customElements.define('x-calendar', Calendar)
```

使用予定のコンポーネントを `customElements.define` で定義する。

```ts
import { LitElement, property } from 'lit-element'

class Calendar extends LitElement {
  @property({ type: Date })
  private start: Date = new Date()
}
```

メンバー変数は Decorator `@property` で定義するので tsconfig.json では experimentalDecorators は true として進める。

## 最後に PWA 対応

`service-worker.js` を読み込む。

```js
var CACHE_NAME = 'calendar-pwa-site-cache-v1';
var urlsToCache = [
  '/'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        // console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```

Nuxt.js でいうような `@nuxtjs/pwa` に当たる便利なプラグインが存在しそうな気もする。

## 最後に

もう相手にする必要は無いと考えているが IE 対応もやっておいた。後日 IE について広く書かせていただく予定なので暫しお待ちいただければ幸いです。

### IE 対応

主に下記 2 つやれば良い。

- 別途 polyfill を読み込む
- ES5 として吐き出す

### polyfill を読み込む

IE11 は WebComponent に対応していないので、別途 polyfill が必要。

```bash
yarn add @webcomponents/webcomponentsjs
```

適宜 `@webcomponents/webcomponentsjs` を読み込む。ここで bundle と loader の 2 種類存在する中で、後者 loader を選択した。その訳は Chrome などに代表されるモダンブラウザを重くしたくないため。

```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" defer></script>
```

### ES5 として吐き出す

IE11 は ES6 すら対応していないため ES5 以下にまで考慮する必要がある。

```bash
polymer build

# polyfill を読み込む
polymer build --extra-dependencies node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js

# ES5 として吐き出す
polymer build --extra-dependencies node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js --js-compile
```

ここまでやって、やっと IE11 上で動く。
