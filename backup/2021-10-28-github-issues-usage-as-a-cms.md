---
date: 2021-10-28
title: Github issues を CMS として扱う
description: 平日の毎朝 Twitter Spaces で雑談している技術情報を Github issues に書き留めている。その際 Github issues を CMS として扱うことのできるメリットについて書かせていただいた。
slug: github-issues-usage-as-a-cms
reaction: 🐙
category: Server
tags: 
 - Vite
 - Vue
 - TypeScript
 - GithubAPI
 - CMS
---

平日の毎朝 Twitter Spaces で喋っているのが日常の一部と化している今日この頃。

![](https://i.imgur.com/7tiOTpE.jpg)

当時 Public Beta になったばかりの Notion API にひとつの魅力を感じ流行りに乗っかっては Notion にまとめた次第です。

3 か月前に書いた記事をチェックしていただければ幸いです。

::: message is-primary

ひとつのデータベースとして Notion を使ってみる始め方について書かせていただいた。

[Notion をひとつのデータベースとして扱う](../notion-api-usage-as-a-database)

:::

日々 Notion に書き留めていたが、この度 Github issue に移行した。

理由は課金を回避するため。ただ最初からエンジニア界隈で一番馴染みのある Github を選択しておいても良かったですね。

## Github API v4 を使う

徹底的に自動化を行う。

主に下記の場面で実践させていただいた。

- Google Apps Script で新しい issue を作成するスクリプトを書いて、毎朝決まった時間に実行する
- 喋った内容をウェブサイトでも確認するため Github API を利用して全ての issue を取得する

Notion を使っていた時と同じ前者については説明を省かせていただく。

### クエリを準備する

下記に示したリクエスト制限も気になるところですが、今回は Github API v4 を使った。

|API type|Description|
|:---|:---|
|v3|5000 リクエスト数 / 1h|
|v4|5000 ノード数 / 1h|

REST と違って必要なものだけ記述すれば良い。

[旧・オハヨーエンジニア](https://nekohack.notion.site/nekohack/Quick-Note-c0a6b685fb524ca4823cc1dccbf2f9b8)

基本的なスキーマはこれまでと大きな差異はありません。

今回必要なものは下記の通りです。

- タイトル
- 作成日時
- Label 一覧
- コメント内容
- 参加者 (コントリビュータ) 一覧

```ts
import gql from 'graphql-tag'

export const searchQuery = gql`
  query {
    viewer {
      login
      repository(name: "ohayo-developers") {
        description
        createdAt
        name
        issues(
          last: 100
          orderBy: { field: CREATED_AT, direction: DESC }
        ) {
          nodes {
            id
            body
            createdAt
            title
            url
            number
            labels(last: 10) {
              nodes {
                id
                name
              }
            }
            timelineItems(first: 10) {
              nodes {
                ... on IssueComment {
                  id
                  body
                }
              }
            }
            participants(last: 10) {
              nodes {
                id
                login
                name
                avatarUrl(size: 40)
              }
            }
          }
        }
      }
    }
  }
`
```

`timelineItems` を取得する際に注意すること。

それは Interface や Union を利用するため事前定義のスキーマに対応した Fragment Matcher を用意する必要がある。

```json
{
  "__schema": {
    "types": [
      {
        "kind": "UNION",
        "name": "IssueComment",
        "possibleTypes": [
          {
            "name": "IssueComment"
          }
        ]
      }
    ]
  }
}
```

そして Apollo Client のキャッシュで Fragment Matcher を設定する。

```ts
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher
  })
})
```

最終的に Vue で Apollo Client が使うために下記のような形となった。

```ts
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, concat } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

const GITHUB_API_V4 = 'https://api.github.com/graphql'

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `bearer ${
        import.meta.env.VITE_APP_GITHUB_API_ACCESS_TOKEN
      }`,
      Accept: 'application/vnd.github.v4.idl'
    }
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  uri: GITHUB_API_V4,
  fetch
})

export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink)
})
```

もちろん事前に Github で Apollo Client を使うためのアクセストークンを発行しなければいけない。

### `@vue/apollo-composable` を使う

Hooks ベースで書ける `@vue/apollo-composable` を使う。

```ts
import { useQuery, useResult } from '@vue/apollo-composable'
import { searchQuery } from '../graphql/issue'

export default {
  setup() {
    const { result, error, loading } = useQuery(searchQuery)
    const issues = useResult(
      result,
      null,
      (data) => data.viewer.repository?.issues?.nodes
    )
    return { loading, error, issues }
  }
}
```

先に作成したクエリと Plugin を合わせ、適宜呼び出したいコンポーネントで呼び出す。これをもってデータのフェッチが実現する。

- `@vue/apollo-composable` の `useQuery` でクエリを読み込む
- useResult でレスポンスが吐き出される
    - ここから先はよしなりにデータを加工してページの描画に繋げる

## 最後に

API の使い心地として、まだ Notion は完全でない。また Vite を静的サイトで使うため SG 用に設定した際はちょっと面倒臭かった印象があった。

後者 Vite について詳しくは後日書きたい。

### 雑談という取り組みについて

今後もこの取り組みは継続予定ですので、お時間ある方は 5 分間耳だけでも聴いてみてください。
