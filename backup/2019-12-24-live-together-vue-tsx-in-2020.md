---
date: 2019-12-24
title: 2020年はVueをTSXで書く？
description: この記事は Vue Advent Calendar 2019 の 24 日目の記事です。Composition API採用後、VueをTSXで書く選択肢が生まれやすくなるため、簡単にスタートアップできることを書きました。
slug: live-together-vue-tsx-in-2020
reaction: ⚡️
category: Front
tags: 
 - Vue
 - TypeScript
 - Advent-Calendar
---

## まず前提として、

現時点で基本的には Vue を TSX で書けるようになっておりまだまだ苦労を伴う。

そんな TSX を Composition API と合わせて書いた時に感じた苦労話などを先日投稿、v-okinawa #3 でもリモートながら喋らせていただいてます。

> v-okinawa #3
> https://webneko.dev/posts/enter-the-final-v-okinawa-in-2019

そして今日はその TSX を使って Vue を書くためのスタートアップについて書きました。

### VueをTSで書くとは、

これまで Vue を TS で書くためには素で書くか API を大きく分けると二択存在。

さらに細かく分けると以下 3 種類存在する。

1. Vue.extend
2. Class Component
3. vue-property-decorator

当然これらを使っても TSX で書けるのですが、来たる Vue3 に向け Composition API 採用によって第一に書きやすいこと。

より迅速にスタートアップできること、そして TSX による厳密な型管理を実現できる。

あとは React と Vue の双方で TSX を書けるようになることは、互いに往き来しやすいというメリットも生まれそうです。

## WebpackとVue、そしてTSX

まず基本から、Webpack をモジュールバンドラにした場合どんな感じで書けるのか。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    }
}
```

こんな感じで各種ローダを読み込むと最低限 Vue を TS で書けるようになる。

ここまではさくっと流した上で、TSX で書くための準備として Babel を設定する必要がある。

今回は babel-plugin-transform-vue-jsx を使いたいので。

```js
plugins: ['transform-vue-jsx]
```

ルートコンポーネントである App.vue を App.tsx に置き換えます。

```ts
import Vue, { CreateElement, VNode } from 'vue'

export default Vue.extend({
    render(h: CreateElement): VNode {
        return (
            <div class="container">
                <transition name="fade">
                    <router-view />
                </transition>
            </div>
        )
    }
})
```

これで Vue を TSX で書くための準備が整いますね。

<a class="link-preview" href="https://github.com/jiyuujin/vue-tsx-boilerplate">jiyuujin/vue-tsx-boilerplate</a>

詳しくはこちらのリポジトリを参照ください。

## Vue CLIでTSXを使う

構築できたとはいえ実際のプロジェクト導入にあたって、Webpack を直接メンテすることは極力避けたいですね。ということで Vue CLI の中で TSX を使いましょう。

```bash
vue create vue-tsx-boilerplate
```

このように `vue create` すると @vue/cli-plugin-babel を確認できる。

JSX を JavaScript に変換してくれる babel-plugin-transform-vue-jsx が既に含まれている。

ではこれで TSX を書いて動くのか、残念ながら動きません。

その理由は createComponent を h にマッピングできていないから。これを解決するため、自動で createComponent を h にマッピングしてくれる babel-preset-vca-jsx を利用します。

```js
presets: ['vca-jsx']
```

TSX のトランスパイル設定を忘れずに。

```json
{
    "jsx": "preserve",
}
```

React 以外でも TSX を使えるようになります。

あとは型定義を拡張すること。

```ts
import Vue, { VNode } from 'vue';
import { ComponentRenderProxy } from '@vue/composition-api';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any;
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
```

ルートコンポーネントである App.vue を App.tsx に置き換えます。

```ts
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: {}, ctx: SetupContext) {
        return () => (
            <div class="container">
                <transition name="fade">
                    <router-view />
                </transition>
            </div>
        )
    }
})
```

これで Vue CLI でも TSX を使って書けるようになります。

<a class="link-preview" href="https://github.com/jiyuujin/vue-cli-tsx-boilerplate">jiyuujin/vue-cli-tsx-boilerplate</a>

詳しくはこちらのリポジトリを参照ください。

## スタイルの適用

ここまで来ると次はスタイルですね。

実際に私自身が書いているお供に vue-styled-components の存在があります。

使い方こそ特筆すべき事項も無くて README を見て構築できるが react 同様 CSS in JS で書けるのですんなりと入っていけました。

<a class ="link-preview" href="https://www.npmjs.com/package/vue-styled-components">vue-styled-components</a>

ただし CSS in JS 自体向き不向きがあると思っているので必ずしもオススメはしません。

以下のようにスタイルをテンプレートに直接書く方法もあります。

```ts
{`
    <style jsx>
        .title {
            height: 100%;
        }
    </style>
`}
```

この辺りは何が王道で、というのが自分自身でも分からないので教えて欲しいといった次第。

## 最後に、

色々とスタートアップについて書いてきました。

```ts
<script lang="tsx">
import { createComponent, SetupContext } from '@vue/composition-api'

export default createComponent({
    setup(props: {}, ctx: SetupContext) {
        return () => (
            //
        )
    }
})
</script>
```

無理に拡張子を TSX にする必要はなく、Vue ならではの書き方を踏襲することがとりあえず良さそうです。

来る 2020 年、早いうちにも Vue3 が正式に登場することになります (るでしょう)

Vue を TSX で書く元年になるとも思っているので、個人的にはこの年末年始にでも慣らしておこうかな。
