---
date: 2021-03-03
title: Nuxt の Full Static Generation とは
description: 動的ルーティングを導入したページ遷移の場面でその影響を受けたのを機に Nuxt の Full Static Generation について簡単に書いておく。
slug: what-is-full-static-generation-of-nuxt
reaction: 💯
category: Server
tags: 
 - Vue
 - Nuxt
---

## 動的ルーティングを導入した際に出会す 404 エラー

とある静的サイトを製作・立ち上げた際、動的ルーティングを導入したページ遷移の場面でその影響を受けたので簡単に書いておく。

## `static` モード

Nuxt 2.13 以降より使える機能で API レスポンスも合わせた完全な静的化を実現できるのが特徴。

[The target Property | Nuxt](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-target)

内部的にクローリング処理が行われており全てのリンク先を自動検出してページ生成してくれる。

すなわちこれまでにやっていたルーティング拡張をしなくて済む。

```ts
generate: {
    async routes() {
        const page = 0
        const displayedFavoriteImages = await axios.get(
            Endpoints.FAVORITE_IMAGE_LIST(page)
        )
        return [
            ...displayedFavoriteImages.data.map((image) => {
                return { route: `gallery/${image.id}`, payload: image }
            })
        ]
    }
}
```

### 変更方法

デフォルト値が `server` を `static` に変更すれば良い。

```ts
export default {
    target: 'static',
}
```

## 最後に

Next.js でも同様の Full Static Generation 機能は既に実現されているとのこと。

Next.js や Nuxt.js がありとあらゆることをこなしており、ブラックボックス化していることを改めて痛感させられた。
