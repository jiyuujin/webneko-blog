---
date: 2018-10-09
title: NuxtとContentfulで簡単ブログ生活
description: Headless CMSの一つであるContentfulを使って、めでたくブログ活動を開始します！
slug: create-the-webneko-blog-used-nuxt-js-and-contentful
reaction: ⛰
category: Front
tags: 
 - Nuxt
 - Contentful
 - CMS
---

特別なスタイルを当てなければブログの開発にたった 1 日。インフラの構築もたった 1 日、テスト環境では Netlify を、本番環境では AWS Fargate を採用。

## Model を作成する

予め Contentful の管理画面より登録でき次第スペース、テンプレートを作成。

またフロントエンドフレームワーク (Nuxt.js) から Contentful の入るデータにアクセスするため必要なトークンを設定。

```bash
# スペース
contentful space create --name 'Nuxt blog'

# テンプレート
contentful space seed --template blog

# アクセストークン
contentful space accesstoken create --name nuxt-blog
```

基本的にカラムを作るのも各個人の判断。

| Column | Type |
|:---|:---|
| Title | string |
| Slug | string |
| Hero image | string |
| Description | string |
| Body | string |
| Author | object |
| Publish | Date |
| Tags | `Array<string>` |
| Category | string |

当ブログにおいては下記のようにカラムを準備した。

### 特記事項

画像投稿は `Hero Image` より容易に設定可能。Contentful 内 CDN を利用しているようですが、個人的には Imgur を優先して使うので、あまり使うことは無いかも。

`tags` や `category` は以下 `validations` に見られるようにバリデーションを設定可能。

```json
{
  "fields": [
    {
      "id": "tags",
      "name": "Tags",
      "type": "Array",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Symbol",
        "validations": [
          {
            "in": [
              "Atomic-Design",
              "AWS",
              "CakePHP",
              "Contentful",
              "CSS",
              "Docker",
              "Firebase",
              "Firestore",
              "Flutter",
              "GDPR",
              "Github API",
              "Google-Apps-Script",
              "Heroku",
              "HTML5",
              "Java",
              "Jest",
              "JSConf",
              "JWT",
              "Laravel",
              "Netlify",
              "Now.sh",
              "Nuxt",
              "Parcel",
              "PHP",
              "Python",
              "React",
              "Review",
              "Storybook",
              "TypeScript",
              "Vue",
              "VueFes",
              "Webpack",
              "PWA",
              "Advent-Calendar",
              "Vue-CLI",
              "GCP",
              "Next.js",
              "Rust",
              "Web Assembly",
              "Note",
              "NodeJS"
            ]
          }
        ]
      }
    },
    {
      "id": "category",
      "name": "Category",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [
        {
          "in": [
            "Front",
            "Server",
            "Application",
            "Scrap"
          ]
        }
      ],
      "disabled": false,
      "omitted": false
    }
  ]
}
```

## Nuxt で REST を実行する

一通り `.contentful.json` に設定を記述するが、Nuxt では `.env` を新たに作って、 process.env でアクセスできるようにします。

```.js
module.exports = {
    env: {
        CTF_PERSON_ID: CONTENTFUL_CONFIG.CTF_PERSON_ID,
        CTF_BLOG_POST_TYPE_ID: CONTENTFUL_CONFIG.CTF_BLOG_POST_TYPE_ID,
        CTF_SPACE_ID: CONTENTFUL_CONFIG.CTF_SPACE_ID,
        CTF_CDA_ACCESS_TOKEN: CONTENTFUL_CONFIG.CTF_CDA_ACCESS_TOKEN,
    }
}
```

`createClient()` でインスタンスを作成することでブログを取得できる。

```.js
client
    .getEntries(contentfulOptions)
    .then(entries => {
      // console.log(entries)
    })
    .catch(console.error)
```

`CTF_PERSON_ID` は設定し無くても普通に動作するので気にしない。
