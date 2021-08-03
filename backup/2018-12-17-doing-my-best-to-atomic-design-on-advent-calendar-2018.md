---
date: 2018-12-17
title: Atomic Designでの技術選定の結果、そして今後
description: 3日程早い時期の投稿ですが、Nuxt.js Advent Calendar 2018 21日目の記事です。
slug: doing-my-best-to-atomic-design-on-advent-calendar-2018
reaction: 🎨
category: Front
tags: 
 - Nuxt
 - Firebase
 - Firestore
 - Atomic-Design
 - Advent-Calendar
---

前回のおさらいに、 [Firebase Advent Calendar 8日目](https://webneko.info/posts/migration-to-firestore-on-advent-calendar-2018) をご確認ください。

リポジトリ[jiyuujin/nuxt-admin-server](https://github.com/jiyuujin/nuxt-admin-server)下で進めています。

## 今回の結論

これといった結論はありません。

日々より良い、ニーズに合ったコンポーネント設計を訴求することを考えれば良いです。

## 基本的な設計原則

pages 下では画面ごとに index.vue を用意、それぞれの.vue で該当する Vuex モジュールにアクセスします。アクセス先である components 下では、 [Vue.js入門 基礎から実践アプリケーション開発まで](https://www.amazon.co.jp/dp/4297100916/ref=asc_df_42971009162551328/)に記載されている通り、設計と実装を進めており相違は存在しません。

```
+ components
|-- atoms
|-- molecules
|-- organisms
|-- templates
```

MainTemplate をインポートすることで、基本的なレイアウトを共通化。 `slot` タグに、ページ固有の情報を入れます。入力フォームや、中小規模のコンポーネントを配置したりなど。

```html
<main-template
    :loading="loading"
>
    <NewTip />
</main-template>
```

情報取得は pages に限定。

この pages でのみ、 API から情報を取得、 Vuex ストアにアクセスする。

適宜使用するコンポーネントに応じて props で値を受け渡し、各コンポーネントから渡される場合は $emit を使う。

```js
import { mapActions } from 'vuex';
export default {
    computed: {
        ...mapActions('initTips')
    }
}
```

molues や organisms の違いって何でしょうと。

Nuxt を触っている人なら誰しもが首をかしげる箇所にハマりました。

現時点ではリポジトリ固有か否かで判定を行い、リポジトリ固有だった場合には organisms に入れています。
