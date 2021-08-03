---
date: 2021-05-18
title: Notion をひとつのデータベースとして扱う
description: 先日 Public Beta となった Notion API を軽く試したので簡単に記録しています。
slug: notion-api-usage-as-a-database
reaction: 👮‍♀️
category: Server
tags: 
 - Notion
 - Github-Actions
---

Notion API が 5 月 14 日に Public Beta となった。既に公へ出ているブログなどいくつか確認させていただくと下記の辺りが気になる。

- パラグラフブロックの文字数制限があるっぽい
- 画像情報を取れない

基本的に様子見のスタンスではあるが、簡単に試してみたのでその話を。

[公式ドキュメント](https://developers.notion.com/docs) の Create a new integration で integration を作成することから始まる。

- Internal integration
- Public integration

上記 2 つ選択肢のうち特に public な integration として設定する予定も無いので Internal integration を選択する。

作成後トークンが自動的に生成される。

## データベースとして Notion を使う

データベースとして使うために指定の workspace でテーブルを作成する。

![](https://i.imgur.com/3PEOkHY.jpg)

指定の workspace に対して integration を招待する。

![](https://i.imgur.com/pzmwwxW.jpg)

トークンとデータベース ID が分かれば curl コマンドによって実行できる。

- `{NOTION_API_KEY}` に integration トークンを設定する
- `{DATABASE_ID}` にデータベース ID を設定する

```bash
curl -X POST https://api.notion.com/v1/pages \
  -H "Authorization: Bearer {NOTION_API_KEY}" \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-05-13" \
  --data '{
    "parent": { "database_id": "{DATABASE_ID}" },
    "properties": {
      "Name": {
        "title": [
          {
            "text": {
              "content": "5/18の予定"
            }
          }
        ]
      }
    }
  }'
```

エラー無く追加できれば OK。

```bash
{"object":"page","id":"{DATABASE_ID}","created_time":"2021-05-15T04:19:15.509Z","last_edited_time":"2021-05-15T04:19:15.509Z","parent":{"type":"database_id","database_id":"{DATABASE_ID}"},"archived":false,"properties":{"Name":{"id":"title","type":"title","title":[{"type":"text","text":{"content":"5/15の予定","link":null},"annotations":{"bold":false,"italic":false,"strikethrough":false,"underline":false,"code":false,"color":"default"},"plain_text":"5/15の予定","href":null}]}}}
```

## SDK を使う

実際の現場では SDK を使うことが想定されるでしょう。また下記に示した延長線上でスキーマの定義を済ませると CMS としても導入しやすそうです。

[makenotion/notion-sdk-js](https://github.com/makenotion/notion-sdk-js)

### データベースアイテムを追加する

今回のデータベースは Name カラムのみ存在させた。これ以外のカラムを追加したい場合は、適宜追加したいカラムに合わせて properties の中で設定すれば良い。

データベースアイテムを追加する際、事前に `Client({{ auth: XXX })` を書いて Notion クライアントをインスタンス化すれば良い。

```ts
const { Client, LogLevel } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    logLevel: process.env.NODE_ENV !== 'production' && LogLevel.DEBUG
});

// データベースアイテムを追加する
const response = await notion.pages.create({
    parent: {
        database_id: process.env.OHAYO_NOTES_DATABASE_ID,
    },
    properties: {
        'Name': {
            title: [
                {
                    text: {
                        content: 'Sample'
                    }
                }
            ]
        }
    }
});
```

### データベースアイテムを取得する

データベースアイテムを取得する際も同じく、事前に Notion クライアントをインスタンス化すれば良い。

```ts
const { Client, LogLevel } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    logLevel: process.env.NODE_ENV !== 'production' && LogLevel.DEBUG
});

// データベースアイテムを追加する
const response = await notion.databases.query({
    database_id: process.env.OHAYO_NOTES_DATABASE_ID
});
```

#### ソートも容易に

下記 sorts オプションを設定すれば良い。

```ts
sorts: [
    {
        timestamp: 'created_time',
        direction: 'descending'
    }
]
```

## 実際の場面で Github Actions と合わせた例を

平日毎朝 09:00 より Twitter Spaces でエンジニア間交流している。

[`#ohayo_engineer` | Twitter](https://twitter.com/search?q=%23ohayo_engineer&src=typed_query)

そこで毎朝自動で Notion ページを作成したい。

簡単に cron の設定内容を確認できるウェブサイトの力も借りると至って簡単です。

[crontab guru](https://crontab.guru/#5_0_*_*_MON-FRI)

```yml
on:
  schedule:
    - cron: "5 0 * * MON-FRI"
```

Notion API と Github Actions を試したリポジトリはこちら。

[jiyuujin/ohayo](https://github.com/jiyuujin/ohayo)

## 最後に、

先も言ったように平日毎朝 09:00 より Twitter Spaces でエンジニア間交流している。

[`#ohayo_engineer` | Twitter](https://twitter.com/search?q=%23ohayo_engineer&src=typed_query)

リスナーからでもご気軽に参加いただければ幸いです。
