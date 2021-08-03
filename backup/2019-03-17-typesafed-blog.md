---
date: 2019-03-17
title: Web 猫ブログ (Nuxt) を TypeScript 化しました
description: Nuxt 3 より本格サポート予定の TypeScript を当ブログに導入、今回はその導入編を簡単に書いた。
slug: typesafed-blog
reaction: 💪
category: Front
tags: 
 - Nuxt
 - TypeScript
 - Contentful
---

`nuxt-ts` 採用にあたってかれこれ 1 年以上、メンテストップ中の公式テンプレートを見るも一切頼りにはできません。

[nuxt-community/typescript-template](https://github.com/nuxt-community/typescript-template)

当ブログでは奇しくもちょうどひと月前に更新済。つい先日 `nuxt-ts` が不要になるのを見たばかり、しかし　`nuxt-ts` をインストールするしかありません。

```bash
yarn add nuxt-ts
yarn add typescript @types/node ts-loader -D
```

## まずやること

前提として下記 3 点やった。

逆にいうとこれができれば、コンポーネントも難なく書き換えられる (はず)

- nuxt.config.js を nuxt.config.ts に書き換える
- 型定義を自分で書く
- Options API を使ってコンポーネントも書き換える

::: message is-primary

ここで `はず` と書いた理由。それは `noImplicitAny` を `false` にしなければしんどいため。

:::

## nuxt.config.js を nuxt.config.ts に書き換える

Sitemap 生成や Makdown パースなど、全て型安全に書けるようになる。

### Sitemap 生成

routes メソッドで記事を取得。

```ts
async routes() {
    const client: ContentfulClientApi = contentful.createClient({
        space: process.env.CTF_SPACE_ID,
        accessToken: process.env.CTF_CDA_ACCESS_TOKEN
    })

    const posts = await client.getEntries({
        content_type: process.env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
    })

    const urls: string[] = []
    posts.items.forEach((post: Entry<any>, index: number) => {
        urls[index] = 'posts/' + post.fields.slug
    })

    return urls
}
```

### Markdown パース

コードのシンタックハイライトは markdown-it-highlight を使って実現。

```ts
highlight: (str, lang) => {
    const hl = require('highlight.js')
    if (lang && hl.getLanguage(lang)) {
        try {
            return (
                '<pre class="hljs"><code>' +
                hl.highlight(lang, str, true).value +
                '</code></pre>'
            )
        } catch (__) {}
    }
    // 言語設定がない場合、プレーンテキストとして表示する
    return (
        '<pre class="hljs"><code>' +
        hl.highlight('plaintext', str, true).value +
        '</code></pre>'
    )
}
```

## 型定義を自分で書く

あいにく公式サポートされておらず asyncData や fetch などの API を型安全に利用するために自分で書かなければいけない。

Nuxt 公式 Context 一覧と照らし合わせ `/types/nuxt.d.ts` を作成する。

[Context 一覧](https://ja.nux.js .org/api/context)

```js
declare module 'nuxt' {
  import { Store } from 'vuex';
  import { Route } from 'vue-router';

  export class Builder {
    constructor(nuxt: Nuxt);
  }

  export class Nuxt {
    constructor(config?: NuxtConfig);
  }

  export interface NuxtConfig {
    dev: boolean;
    [key: string]: any;
  }

  export interface NuxtContext<S = any> {
    app: NuxtApp;
    isClient: boolean;
    isServer: boolean;
    isStatic: boolean;
    isDev: boolean;
    isHMR: boolean;
    route: Route;
    req: any;
    res: any;
    store: Store<S>;
    env: any;
    params: any;
    query: any;
    redirect(path: string): void;
    error(params: { statusCode: number; message: string }): void;
    nuxtState: any;
    beforeNuxtRender(fn: Function): any;
  }
}
```

上記に加え Contentful 用の Model も自分で書く。

今回はこの辺で。
