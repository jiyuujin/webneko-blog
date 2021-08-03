---
date: 2021-02-16
title: Management API 使ってバックアップを取る
description: API ベースの CMS である Contentful において Git でコンテンツを管理する方法を書きました。
slug: contentful-backup
reaction: 😌
category: Server
tags: 
 - Contentful
 - TypeScript
---

CMS には API ベースと Git ベースの二種類が存在。それぞれの違いについては下記リンクが大変分かり易いので、こちらでは割愛させていただく。

[GitベースのCMSとAPIベースのCMSの比較](https://microcms.io/blog/git-based-cms-vs-api-first-cms/)

間も無く 3 年近く経過する当ブログの裏側で使っている Contentful、API ベースの CMS のひとつ。

製作当時こそ使いにくさを感じなかったものの、使っている内にふと気付いた点が出てきたのも事実。

- 全体的に管理画面がもっさりしている
- 縦に長いモーダルを表示するとその上が見切れてしまう (スクロールも上に行かない)
- 左に編集モード、右にプレビューモードがあると嬉しい

バグもあれば、追加して欲しい機能もある。Github の Issue を立てれば解決するでしょう。しかし自分の中でそれら以上に今、自ら書いた記事を手元に残したい需要が高くなってきた。

とはいえ API ベースの CMS を採用した以上、Git でコンテンツを管理するのは難しい。その弱点を弱点でなくさせる可能性に気付いた。

## JSON ファイルをエクスポート

事前に CTF_SPACE_ID と CTF_MANAGEMENT_TOKEN を取得する。

```bash
contentful login --management-token $CTF_MANAGEMENT_TOKEN
contentful space export --space-id $CTF_SPACE_ID --content-file webneko-blog-export.json
```

ここで CTF_MANAGEMENT_TOKEN は、Management API 用トークンを指す。コンテンツ描画に利用した Delivery API 用トークンとは違う。

トークンを誤って使わないよう気を付けながら webneko-blog-export.json という名目でエクスポート。

## Markdown に変換する

やっていることは至って単純。

- JSON ファイルのパースする
- パースしたコンテンツを Markdown ファイルに落とし込む

fs.readFileSync を使って、先にエクスポートした JSON ファイルをパースする。

```js
import * as fs from 'fs'

(async function () {
    const jsonObject = JSON.parse(await fs.readFileSync('./webneko-blog-export.json', 'utf8'))
    console.log(jsonObject?.entries)
}())
```

続き fs.writeFile を使って、パースしたコンテンツを Markdown ファイルに落とし込む。

```js
import * as fs from 'fs'
import dayjs from 'dayjs'

const dateFormat = (date: string, option: string) => {
    return dayjs(date).format(option)
}

Object(jsonObject?.entries).forEach((obj) => {
    const publishDate = field.publishDate[lang]
    const year = dateFormat(publishDate, 'YYYY')
    const month = dateFormat(publishDate, 'MM')
    const date = dateFormat(publishDate, 'DD')
    const dateText = `${year}-${month}-${date}`

    const slugText = field.slug[lang]

    const bodyText = field.body[lang]

    if (field.slug !== undefined) {
        fs.writeFile(`./posts/${dateText}-${slugText}.md`, bodyText, (err) => {
            if (err) console.log(`Error: ${err}`)
        })
    }
})
```

当ブログでは下記のようにカラムを準備。

| Column | Type |
|:---|:---|
| Title | string |
| Slug | string |
| Reaction | string |
| Hero image | string |
| Description | string |
| Body | string |
| Author | object |
| Publish | Date |
| Tags | `Array<string>` |
| Category | string |

詳しくは下記リンクをご確認いただければ。

[NuxtとContentfulで簡単ブログ生活](https://webneko.dev/posts/created-webneko-blog-used-nuxt-js-and-contentful)

ブログのメインコンテンツである Body を Markdown に取り込めれば今回のゴールに到達する。

## 最後に

これで手元に markdown ファイル形式でバックアップを取ることに成功。ちなみに webhook の設定で S3 連携も可、指定の bucket に JSON ファイルをエクスポートできるそうです。

※ ちなみに Contentful の利用を取り止める考えは現時点で無いことだけは念押しで。
