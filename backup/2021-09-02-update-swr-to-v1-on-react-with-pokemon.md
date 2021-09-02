---
date: 2021-09-02
title: SWR v1 リリース - ポケモンと共に React を学ぶ
description: SWR v1 リリースにあたって注意することを簡単に記録しておきました。
slug: update-swr-to-v1-on-react-with-pokemon
reaction: 🖖🏻
category: Front
tags: 
 - React
 - TypeScript
 - Pokemon-API
---

## Pokemon アプリで扱う SWR を更新する

先日ローンチした Pokemon アプリを React で製作する教材について。

[Hack React](https://reactjs.nekohack.me)

当教材で `SWR@0.5.6` を扱っており、この度 SWR 1.0 のアナウンスメントを受けその情報を更新する。

詳しくは新たに [`ver.2021.1` ブランチ](https://github.com/jiyuujin/pokemon/tree/ver.2021.1) を切らせていただいたので、こちらをご確認いただきたい。

### SWR 1.0 に更新する

詳しくは SWR 公式ブログをご確認いただければ幸いです。

[Announcement SWR 1.0](https://swr.vercel.app/ja/blog/swr-v1)

基本的にはこれまで書いていたやり方を使えば SWR 1.0 についても書ける。

強いて言えば SWR 1.0 に上げる際 fetch の引数を新たに設定する必要がある。

```ts
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const { data, error } = useSWR(
    `${process.env.REACT_APP_POKEMON_API}/pokemon?limit=200&offset=200`,
    fetcher
)
```

### 最後に

SWR 自体パフォーマンスに重きを置いたデータフェッチライブラリのひとつとして公開が始まったことから、引き続きそれが最重要の要素であることを認識させられた。
